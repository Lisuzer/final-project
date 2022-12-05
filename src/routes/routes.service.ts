import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarriageEntity } from '../carriages/schemas/carriage.entity';
import { PriceEntity } from '../prices/schemas/price.entity';
import { StationEntity } from '../stations/schemas/station.entity';
import { TrainEntity } from '../trains/schemas/train.entity';
import { Connection, Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { FindByStationsDto } from './dto/find-by-stations.dto';
import { RouteStationEntity } from './schemas/route-station.entity';
import { RouteEntity } from './schemas/route.entity';
import { IRoutePrices } from './interfaces/route-price.interface';
import { IRoute } from './interfaces/route.interface';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeRep: Repository<RouteEntity>,
    @InjectRepository(RouteStationEntity)
    private readonly routeStationRep: Repository<RouteStationEntity>,
    @InjectRepository(TrainEntity)
    private readonly trainRep: Repository<TrainEntity>,
    @InjectRepository(CarriageEntity)
    private readonly carriageRep: Repository<CarriageEntity>,
    @InjectRepository(StationEntity)
    private readonly stationRep: Repository<StationEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRep: Repository<PriceEntity>,
    private readonly connection: Connection,
  ) { }

  async find(name?: string): Promise<IRoute[]> {
    const routes = await this.routeRep.find({
      where: name ? { name } : {},
      join: {
        alias: 'route',
        leftJoinAndSelect: {
          route_station: 'route.stations',
          station: 'route_station.station',
        },
      },
    });
    return this.transformRouteToOutput(routes);
  }

  async findOneById(id: string): Promise<IRoute> {
    const route = await this.routeRep.findOne({
      where: { id },
      join: {
        alias: 'route',
        leftJoinAndSelect: {
          route_station: 'route.stations',
          station: 'route_station.station',
        },
      },
    });
    return this.transformRouteToOutput([route])[0];
  }

  async findOneWithoutRelations(id: string): Promise<RouteEntity> {
    return await this.routeRep.findOneBy({ id });
  }

  async create(dto: CreateRouteDto): Promise<IRoute> {
    const { train, name, stations, frequency } = dto;
    stations.forEach((station) => {
      if (!station.stationId.length)
        throw new BadRequestException('Station id is required');
    });
    if (stations.length < 2)
      throw new BadRequestException('Route must have at least 2 stations');
    if (!frequency.length)
      throw new BadRequestException('Route must have at least 1 frequency');
    const trainEntity = await this.trainRep.findOneBy({ id: train });
    if (!trainEntity) throw new BadRequestException('Train not found');

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const routeEntity = await queryRunner.manager.save(RouteEntity, {
        name,
        train: trainEntity,
        frequency,
      });
      let index = 0;
      for await (const station of stations) {
        if (
          this.validTime(station.arrivalTime) &&
          this.validTime(station.departureTime)
        ) {
          if (new Date(station.arrivalTime) > new Date(station.departureTime)) {
            throw new BadRequestException(
              'Arrival time must be less than departure time',
            );
          }
          const stationEntity = await this.stationRep.findOneBy({
            id: station.stationId,
          });
          if (!stationEntity)
            throw new BadRequestException('Station not found');
          await queryRunner.manager.save(RouteStationEntity, {
            routeId: routeEntity.id,
            route: routeEntity,
            stationId: stationEntity.id,
            station: stationEntity,
            sequenceIndex: index++,
            arrivalTime: station.arrivalTime,
            departureTime: station.departureTime,
          });
        } else {
          throw new BadRequestException('Invalid time format');
        }
      }
      if (stations.length !== index) throw new BadRequestException('cant');
      await queryRunner.commitTransaction();
      const route = await this.routeRep.findOne({
        where: { id: routeEntity.id },
        join: {
          alias: 'route',
          leftJoinAndSelect: {
            route_station: 'route.stations',
            station: 'route_station.station',
          },
        },
      });
      return this.transformRouteToOutput([route])[0];
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return e;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string) {
    const route = await this.routeRep.findOneBy({ id });
    if (!route) throw new BadRequestException('Route not found');
    await this.routeRep.delete(route.id);
    return this.transformRouteToOutput([route])[0];
  }

  async getRoutesForShedule(stationName: string): Promise<RouteEntity[]> {
    return await this.routeRep
      .createQueryBuilder('route')
      .leftJoinAndSelect('route.stations', 'route_station')
      .leftJoinAndSelect('route_station.station', 'station')
      .where('station.name = :stationName', { stationName })
      .orderBy('route_station.sequenceIndex')
      .getMany();
  }

  async findByStations(dto: FindByStationsDto): Promise<IRoutePrices[]> {
    const { startStation, endStation } = dto;
    if (!startStation || !endStation)
      throw new BadRequestException('Start and end stations are required');
    if (startStation === endStation)
      throw new BadRequestException('Start and end stations must be different');
    const routes = await this.routeRep
      .createQueryBuilder('route')
      .leftJoinAndSelect('route.stations', 'route_station')
      .leftJoinAndSelect('route.train', 'train')
      .leftJoinAndSelect('route_station.station', 'station')
      .orderBy('route_station.sequenceIndex')
      .getMany();
    const [startFrom, endAt] = await Promise.all([
      this.stationRep.findOneBy({ name: startStation }),
      this.stationRep.findOneBy({ name: endStation }),
    ]);
    if (!startFrom || !endAt)
      throw new BadRequestException('Station not found');
    const result = [];

    for (const route of routes) {
      let flag = false;
      for (const routeStation of route.stations) {
        if (routeStation.station.id === startFrom.id) flag = true;
        if (routeStation.station.id === endAt.id && flag) {
          const train = await this.trainRep.findOne({
            where: { id: route.train.id },
            relations: ['carriages'],
          });
          const prices = [];
          for (const carriage of train.carriages) {
            const price = await this.priceRep.findOneBy({
              carriageType: carriage.carriageType,
              trainType: train.trainType,
            });
            const totalPrice = this.resolvePrice(
              route.stations,
              startFrom,
              endAt,
              price.value,
            );
            prices.push({
              trainType: train.trainType,
              carriageType: carriage.carriageType,
              totalPrice,
            });
          }
          result.push({
            id: route.id,
            name: route.name,
            frequency: route.frequency,
            trainNumber: route.train.number,
            prices,
          });
        }
      }
    }
    if (!result.length) {
      throw new BadRequestException('Routes not found');
    }
    return result;
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

  private validTime(time: string) {
    return time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
  }

  private transformRouteToOutput(routes: RouteEntity[]): IRoute[] {
    return routes.map((route) => {
      return {
        id: route.id,
        name: route.name,
        frequency: route.frequency,
        stations: route.stations.map((station) => {
          return {
            id: station.station.id,
            name: station.station.name,
            code: station.station.code,
            arrivalTime: station.arrivalTime,
            departureTime: station.departureTime,
          };
        }),
      };
    });
  }
}

/*
{
  "train": "64fa7fc4-ca2b-41cd-9f4a-94acf90b03fa",
  "name": "Legkoe",
  "stations": [
    {
      "stationId": "354d1edd-77a1-4cfd-9acc-a3e111f36fc1",
      "arrivalTime": "15:30",
      "departureTime": "16:00"
    },
    {
      "stationId": "5c08dc34-4b4d-48fd-b504-557bb0d3162a",
      "arrivalTime": "17:30",
      "departureTime": "18:00"
    },
    {
      "stationId": "8f8aa6b6-8bcb-4544-b75e-1c0100b9907f",
      "arrivalTime": "18:30",
      "departureTime": "19:00"
    },
    {
      "stationId": "0f67171f-9a17-4258-a908-7776d183e277",
      "arrivalTime": "20:30",
      "departureTime": "21:00"
    }
  ],
  "frequency": ["TUESDAY", "WEDNESDAY"]
}
*/
