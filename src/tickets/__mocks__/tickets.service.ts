import { freeSeatsStub } from '../__tests__/stubs/free-seats.stub';
import { statisticStub } from '../__tests__/stubs/statistic.stub';
import { ticketOutPutStub } from '../__tests__/stubs/ticket-output.stub';
import { ticketStub } from '../__tests__/stubs/ticket.stub';

export const TicketsService = jest.fn().mockReturnValue({
  getStatistics: jest.fn().mockReturnValue(statisticStub()),
  getFreeSeats: jest.fn().mockReturnValue(freeSeatsStub()),
  getUserTickets: jest.fn().mockReturnValue([ticketStub()]),
  updateStatus: jest.fn().mockReturnValue(ticketStub()),
  findAll: jest.fn().mockReturnValue([ticketStub()]),
  findOneById: jest.fn().mockReturnValue(ticketStub()),
  buy: jest.fn().mockReturnValue(ticketOutPutStub()),
  book: jest.fn().mockReturnValue([ticketOutPutStub()]),
  delete: jest.fn().mockReturnValue(ticketStub()),
});
