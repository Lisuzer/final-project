import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { mockJwtAuthGuard } from '../../auth/__mocks__/jwt-auth.goard';
import { mockRolesGuard } from '../../auth/__mocks__/roles.guard';
import { BookTicketDto } from '../dto/book-ticket.dto';
import { BuyTicketDto } from '../dto/buy-ticket.dto';
import { IFreeSeats } from '../interfaces/free-seats.interface';
import { IStatistics } from '../interfaces/statistics.interface';
import { ITicketToOutput } from '../interfaces/ticket-to-output.interface';
import { IdDocumentType } from '../schemas/id-doc.enum';
import { TicketStatus } from '../schemas/ticket-status.enum';
import { TicketEntity } from '../schemas/ticket.entity';
import { TicketsController } from '../tickets.controller';
import { TicketsService } from '../tickets.service';
import { freeSeatsStub } from './stubs/free-seats.stub';
import { statisticStub } from './stubs/statistic.stub';
import { ticketOutPutStub } from './stubs/ticket-output.stub';
import { ticketStub } from './stubs/ticket.stub';

jest.mock('../tickets.service');

describe('TicketsController', () => {
  let controller: TicketsController;
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        TicketsService,
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard },
        { provide: RolesGuard, useValue: mockRolesGuard },
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    service = module.get<TicketsService>(TicketsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStatistics', () => {
    let statistics: IStatistics;
    const dto = {
      trainNumber: 5,
      from: '2021-01-01',
      to: '2021-01-01',
    };

    beforeEach(async () => {
      statistics = await controller.getStatistics(dto);
    });

    it('should call service.getStatistics', () => {
      expect(service.getStatistics).toHaveBeenCalledWith(dto);
    });

    it('should return statistics', () => {
      expect(statistics).toEqual(statisticStub());
    });
  });

  describe('getFreeSeats', () => {
    let freeSeats: IFreeSeats;
    const dto = {
      trainNumber: 12,
      routeName: 'Test',
      date: '2021-01-01',
    };

    beforeEach(async () => {
      freeSeats = await controller.getFreeSeats(dto);
    });

    it('should call service.getFreeSeats', () => {
      expect(service.getFreeSeats).toHaveBeenCalledWith(dto);
    });

    it('should return freeSeats', () => {
      expect(freeSeats).toEqual(freeSeatsStub());
    });
  });

  describe('getUserTickets', () => {
    let tickets: ITicketToOutput[];
    const dto = {
      userId: '5458frjg-345njklhb-345jklh',
    };

    beforeEach(async () => {
      tickets = await controller.getUserTickets(dto);
    });

    it('should call service.getUserTickets', () => {
      expect(service.getUserTickets).toHaveBeenCalledWith(dto);
    });

    it('should return tickets', () => {
      expect(tickets).toEqual([ticketStub()]);
    });
  });

  describe('updateStatus', () => {
    let ticket: ITicketToOutput;
    const id = '5458frjg-345njklhb-345jklh';
    const dto = {
      status: TicketStatus.BOUGHT,
    };

    beforeEach(async () => {
      ticket = await controller.updateStatus(id, dto);
    });

    it('should call service.updateStatus', () => {
      expect(service.updateStatus).toHaveBeenCalledWith(id, dto);
    });

    it('should return ticket', () => {
      expect(ticket).toEqual(ticketStub());
    });
  });

  describe('findAll', () => {
    let tickets: TicketEntity[];

    beforeEach(async () => {
      tickets = await controller.findAll();
    });

    it('should call service.findAll', () => {
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return tickets', () => {
      expect(tickets).toEqual([ticketStub()]);
    });
  });

  describe('findOne', () => {
    let ticket: TicketEntity;
    const id = '5458frjg-345njklhb-345jklh';

    beforeEach(async () => {
      ticket = await controller.findOneById(id);
    });

    it('should call service.findOne', () => {
      expect(service.findOneById).toHaveBeenCalledWith(id);
    });

    it('should return ticket', () => {
      expect(ticket).toEqual(ticketStub());
    });
  });

  describe('delete', () => {
    let ticket: TicketEntity;
    const id = '5458frjg-345njklhb-345jklh';

    beforeEach(async () => {
      ticket = await controller.delete(id);
    });

    it('should call service.delete', () => {
      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('should return ticket', () => {
      expect(ticket).toEqual(ticketStub());
    });
  });

  describe('buy', () => {
    let ticket: ITicketToOutput[];
    const dto: BuyTicketDto = {
      tickets: [
        {
          passengerName: 'John',
          passengerSurname: 'Doe',
          passengerPatronymic: 'Johnovich',
          documentType: IdDocumentType.IDCARD,
          idCard: '1234567890',
          ticketId: '5458frj-345njklhb-345jklh',
        },
      ],
    };
    const req = {
      user: {
        id: '5458frjg-345njklhb-345jklh',
      },
    };

    beforeEach(async () => {
      ticket = await controller.buy(dto, req);
    });

    it('should call service.buy', () => {
      expect(service.buy).toHaveBeenCalledWith(dto, req);
    });

    it('should return ticket', () => {
      expect(ticket).toEqual(ticketOutPutStub());
    });
  });

  describe('book', () => {
    let ticket: ITicketToOutput[];
    const dto: BookTicketDto = {
      tickets: [
        {
          trainNumber: 12,
          routeName: 'Test',
          departureDate: '2021-01-01',
          seatNumber: 1,
          departureStation: 'Kyiv',
          arrivalStation: 'Lviv',
          carriageNumber: 1,
        },
      ],
    };
    const req = {
      user: {
        id: '5458frjg-345njklhb-345jklh',
      },
    };

    beforeEach(async () => {
      ticket = await controller.book(dto, req);
    });

    it('should call service.book', () => {
      expect(service.book).toHaveBeenCalledWith(dto, req);
    });

    it('should return tickets', () => {
      expect(ticket).toEqual([ticketOutPutStub()]);
    });
  });
});
