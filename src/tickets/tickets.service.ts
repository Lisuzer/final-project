import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarriageEntity } from '../carriages/schemas/carriage.entity';
import { PriceEntity } from '../prices/schemas/price.entity';
import { Frequency } from '../routes/schemas/frequency.enum';
import { RouteStationEntity } from '../routes/schemas/route-station.entity';
import { RouteEntity } from '../routes/schemas/route.entity';
import { StationEntity } from '../stations/schemas/station.entity';
import { TrainEntity } from '../trains/schemas/train.entity';
import { UserEntity } from '../user/schemas/user.entity';
import { Between, Repository } from 'typeorm';
import { BookTicketDto } from './dto/book-ticket.dto';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { GetFreeSeatsDto } from './dto/get-free-seats.dto';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TicketStatus } from './schemas/ticket-status.enum';
import { TicketEntity } from './schemas/ticket.entity';
import { IStatistics } from './interfaces/statistics.interface';
import { IFreeSeats } from './interfaces/free-seats.interface';
import { ITicketToOutput } from './interfaces/ticket-to-output.interface';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(StationEntity)
    private readonly stationRepository: Repository<StationEntity>,
    @InjectRepository(RouteStationEntity)
    private readonly routeStationRepository: Repository<RouteStationEntity>,
    @InjectRepository(TrainEntity)
    private readonly trainRepository: Repository<TrainEntity>,
    @InjectRepository(CarriageEntity)
    private readonly carriageRepository: Repository<CarriageEntity>,
    @InjectRepository(RouteEntity)
    private readonly routeRepository: Repository<RouteEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<TicketEntity[]> {
    return await this.ticketRepository.find();
  }

  async findOneById(id: string): Promise<TicketEntity> {
    return await this.ticketRepository.findOneBy({ id });
  }

  async getUserTickets({ user }: any): Promise<ITicketToOutput[]> {
    const tickets = await this.ticketRepository.find({
      where: { user: { id: user.id } },
    });
    const _tickets: ITicketToOutput[] = [];
    for (const ticket of tickets) {
      _tickets.push(this.transformTicket(ticket));
    }
    return _tickets;
  }

  async buy(
    buyTicketDto: BuyTicketDto,
    { user }: any,
  ): Promise<ITicketToOutput[]> {
    const { tickets } = buyTicketDto;
    const toOutput: ITicketToOutput[] = [];
    for (const dto of tickets) {
      const ticket = await this.ticketRepository.findOneBy({
        id: dto.ticketId,
      });
      if (!ticket) {
        throw new BadRequestException('Ticket not found');
      }
      const {
        passengerName,
        passengerSurname,
        passengerPatronymic,
        documentType,
        idCard,
      } = dto;
      ticket.idCard = idCard;
      ticket.documentType = documentType;
      ticket.passengerName = passengerName;
      ticket.passengerSurname = passengerSurname;
      ticket.passengerPatronymic = passengerPatronymic;
      ticket.status = TicketStatus.BOUGHT;
      await this.ticketRepository.update(ticket.id, ticket);
      toOutput.push(this.transformTicket(ticket));
    }
    return toOutput;
  }

  async book(dto: BookTicketDto, { user }: any): Promise<ITicketToOutput[]> {
    const { tickets } = dto;
    const toOutput: ITicketToOutput[] = [];
    for (const ticket of tickets) {
      if (ticket.departureStation == ticket.arrivalStation) {
        throw new BadRequestException(
          'Departure and arrival stations are the same',
        );
      }
      const depDateTime = new Date(ticket.departureDate).getTime();
      const todayTime = new Date().getTime();
      if (depDateTime < todayTime) {
        throw new BadRequestException('Departure date is in the past');
      }
      const dateDiff = todayTime - depDateTime;
      if (Math.round(dateDiff / (1000 * 60 * 60 * 24)) > -3) {
        throw new BadRequestException(
          'Booking of tickets is possible no later than 3 days before the departure',
        );
      }
      const {
        trainNumber,
        carriageNumber,
        departureStation,
        arrivalStation,
        routeName,
      } = ticket;
      const input = await Promise.all([
        this.trainRepository.findOne({
          where: { number: trainNumber },
          relations: ['carriages'],
        }),
        this.carriageRepository.findOne({
          where: { train: { number: trainNumber }, number: carriageNumber },
          relations: ['train'],
        }),
        this.routeRepository.findOne({
          where: { name: routeName },
          relations: ['train', 'stations'],
        }),
        this.stationRepository.findOneBy({ name: departureStation }),
        this.stationRepository.findOneBy({ name: arrivalStation }),
      ]);
      if (!input.every((el) => el !== undefined)) {
        throw new BadRequestException('Invalid input');
      }
      if (input[0].id !== input[1].train.id) {
        throw new BadRequestException('Carriage and train are not related');
      }

      let flag = false;
      for (const t of tickets) {
        if (
          t.trainNumber == input[0].number &&
          t.carriageNumber == input[1].number &&
          t.routeName == input[2].name &&
          t.seatNumber == ticket.seatNumber &&
          new Date(t.departureDate).setHours(12) ==
            new Date(ticket.departureDate).setHours(12)
        ) {
          if (flag) {
            throw new BadRequestException('Seat is already booked');
          }
          flag = true;
        }
      }

      const _tickets = await this.ticketRepository.find({
        where: {
          train: { id: input[0].id },
          carriage: { id: input[1].id },
          route: { id: input[2].id },
          seatNumber: ticket.seatNumber,
          departureDate: new Date(ticket.departureDate),
        },
        relations: ['carriage', 'train', 'route'],
      });
      if (_tickets.length) {
        throw new BadRequestException('Seat is already booked');
      }
      if (ticket.seatNumber > input[1].seatCapacity) {
        throw new BadRequestException('Invalid seat number');
      }
      if (
        !input[2].frequency.some((el) =>
          this.resolveFrequency(el, new Date(ticket.departureDate)),
        )
      ) {
        throw new BadRequestException('Date does not fit route frequency');
      }

      if (!this.resolvePath(input[2].stations, input[3], input[4])) {
        throw new BadRequestException('Stations are not related to route');
      }
      const { trainType } = input[0];
      const { carriageType } = input[1];
      const price = await this.priceRepository.findOneBy({
        carriageType,
        trainType,
      });
      if (!price) {
        throw new BadRequestException('Price not founded');
      }
      const totalPrice = this.resolvePrice(
        input[2].stations,
        input[3],
        input[4],
        price.value,
      );
      const ticketEntity = new TicketEntity();
      const userEntity = await this.userRepository.findOneBy({ id: user.id });
      ticketEntity.user = userEntity;
      ticketEntity.train = input[0];
      ticketEntity.carriage = input[1];
      ticketEntity.route = input[2];
      ticketEntity.departureStation = input[3];
      ticketEntity.arrivalStation = input[4];
      ticketEntity.departureDate = new Date(ticket.departureDate);
      ticketEntity.seatNumber = ticket.seatNumber;
      ticketEntity.price = price;
      ticketEntity.totalPrice = totalPrice;
      ticketEntity.departureDate = new Date(ticket.departureDate);
      ticketEntity.seatNumber = ticket.seatNumber;
      ticketEntity.status = TicketStatus.BOOKED;
      await this.ticketRepository.save(ticketEntity);
      toOutput.push(this.transformTicket(ticketEntity));
    }
    return toOutput;
  }

  async delete(id: string): Promise<TicketEntity> {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new BadRequestException('Ticket not found');
    }
    await this.ticketRepository.delete(id);
    return ticket;
  }

  async getFreeSeats(dto: GetFreeSeatsDto): Promise<IFreeSeats> {
    const { trainNumber, routeName, date } = dto;
    if (new Date(date).setHours(12) < new Date().setHours(12)) {
      throw new BadRequestException('Invalid date');
    }
    const [train, route] = await Promise.all([
      this.trainRepository.findOne({
        where: { number: trainNumber },
        relations: ['carriages'],
      }),
      this.routeRepository.findOne({
        where: { name: routeName },
        relations: ['train'],
      }),
    ]);
    if (!train || !route) {
      throw new BadRequestException('Invalid input');
    }
    if (train.id !== route.train.id) {
      throw new BadRequestException('Train and route are not related');
    }
    if (route.frequency instanceof Array) {
      if (
        !route.frequency.some((el) => this.resolveFrequency(el, new Date(date)))
      ) {
        throw new BadRequestException('Date does not fit route frequency');
      }
    } else {
      if (
        !this.resolveFrequency(route.frequency[0] as Frequency, new Date(date))
      ) {
        throw new BadRequestException('Date does not fit route frequency');
      }
    }
    const tickets = await this.ticketRepository.find({
      where: {
        train: { id: train.id },
        route: { id: route.id },
        departureDate: new Date(date),
      },
    });
    const result = {};
    for (const carriage of train.carriages) {
      result[carriage.number] = [];
    }
    for (const ticket of tickets) {
      result[ticket.carriage.number].push(ticket.seatNumber);
    }
    const freeSeats: IFreeSeats = {};
    for (const carriage of train.carriages) {
      freeSeats[`carriage №${carriage.number}`] = Array.from(
        { length: carriage.seatCapacity },
        (v, k) => k + 1,
      ).filter((el) => !result[carriage.number].includes(el));
    }
    return freeSeats;
  }

  async updateStatus(
    id: string,
    dto: UpdateStatusDto,
  ): Promise<ITicketToOutput> {
    const { status } = dto;
    if (!Object.values(TicketStatus).includes(status)) {
      throw new BadRequestException('Invalid status');
    }
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new BadRequestException('Ticket not found');
    }
    ticket.status = status;
    await this.ticketRepository.update(id, ticket);
    return this.transformTicket(ticket);
  }

  async getStatistics(dto: GetStatisticsDto): Promise<IStatistics> {
    const { trainNumber, from, to } = dto;

    const fromDate = from ? new Date(from) : new Date(3600 * 24 * 1000);
    const toDate = to ? new Date(to) : new Date();
    if (fromDate > toDate) {
      throw new BadRequestException('Invalid date range');
    }
    const findCondition = !trainNumber
      ? { departureDate: Between(fromDate, toDate) }
      : {
          train: { number: trainNumber },
          departureDate: Between(fromDate, toDate),
        };
    const tickets = await this.ticketRepository.find({
      where: {
        ...findCondition,
      },
    });
    let totalPrice = 0;
    const ticketStatus = { BOUGHT: 0, BOOKED: 0 };
    tickets.forEach((el) => {
      totalPrice += el.totalPrice;
      ticketStatus[el.status]++;
    });
    return { totalTickets: tickets.length, totalPrice, ticketStatus };
  }

  private resolvePath(
    stations: RouteStationEntity[],
    startFrom: StationEntity,
    endTo: StationEntity,
  ): boolean {
    stations.sort((a, b) => {
      return a.sequenceIndex - b.sequenceIndex;
    });

    let flag = false;
    for (const s of stations) {
      if (s.station.id == startFrom.id) flag = true;
      else if (s.station.id == endTo.id && flag) return true;
    }
    return false;
  }

  private getTravelStations(
    stations: RouteStationEntity[],
    startFrom: StationEntity,
    endTo: StationEntity,
  ): StationEntity[] {
    let flag = false;
    const travelStations: StationEntity[] = [];
    for (const s of stations) {
      if (s.station.id == startFrom.id) {
        flag = true;
        travelStations.push(s.station);
        continue;
      }
      if (flag) {
        travelStations.push(s.station);
      }
      if (s.station.id == endTo.id) {
        break;
      }
    }
    return travelStations;
  }

  private resolvePrice(
    stations: RouteStationEntity[],
    startFrom: StationEntity,
    endTo: StationEntity,
    price: number,
  ): number {
    stations = stations.sort((a, b) => {
      return a.sequenceIndex - b.sequenceIndex;
    });
    const travelStations = this.getTravelStations(stations, startFrom, endTo);
    const totalPrice = (travelStations.length - 1) * price;
    return totalPrice;
  }

  private resolveFrequency(freq: Frequency, date: Date): boolean {
    if (freq == Frequency.DAILY) return true;
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    switch (freq) {
      case Frequency.EVENDAY:
        return dayOfMonth % 2 == 0;
      case Frequency.ODDDAY:
        return dayOfMonth % 2 == 1;
      case Frequency.MONDAY:
        return dayOfWeek == 1;
      case Frequency.TUESDAY:
        return dayOfWeek == 2;
      case Frequency.WEDNESDAY:
        return dayOfWeek == 3;
      case Frequency.THURSDAY:
        return dayOfWeek == 4;
      case Frequency.FRIDAY:
        return dayOfWeek == 5;
      case Frequency.SATURDAY:
        return dayOfWeek == 6;
      case Frequency.SUNDAY:
        return dayOfWeek == 0;
    }
  }

  private transformTicket(ticket: TicketEntity): ITicketToOutput {
    return {
      id: ticket.id,
      passengerName: ticket.passengerName || null,
      passengerSurname: ticket.passengerSurname || null,
      passengerPatronymic: ticket.passengerPatronymic || null,
      documentType: ticket.documentType || null,
      idCard: ticket.idCard || null,
      departureStation: ticket.departureStation.name,
      arrivalStation: ticket.arrivalStation.name,
      departureDate: ticket.departureDate,
      routeName: ticket.route.name,
      trainNumber: ticket.train.number,
      seatNumber: ticket.seatNumber,
      carriageNumber: ticket.carriage.number,
      totalPrice: ticket.totalPrice,
      status: ticket.status,
    };
  }
}
