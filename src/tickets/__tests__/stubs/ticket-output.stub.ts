import { IdDocumentType } from '../../schemas/id-doc.enum';
import { TicketStatus } from '../../schemas/ticket-status.enum';

export const ticketOutPutStub = () => {
  return {
    id: 'b4142593-c00f-4c1e-a670-7433cce0a89f',
    trainNumber: 1,
    routeName: 'Test',
    departureStation: 'Test',
    arrivalStation: 'Test',
    departureDate: '2021-01-01',
    seatNumber: 1,
    carriageNumber: 2,
    totalPrice: 1500,
    status: TicketStatus.BOOKED,
    passengerName: 'Vasya',
    passengerSurname: 'Pupkin',
    passengerPatronymic: 'Pupkin',
    documentType: IdDocumentType.IDCARD,
    idCard: '1234567890',
  };
};
