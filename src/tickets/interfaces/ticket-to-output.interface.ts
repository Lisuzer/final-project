import { IdDocumentType } from '../schemas/id-doc.enum';
import { TicketStatus } from '../schemas/ticket-status.enum';

export interface ITicketToOutput {
  id: string;
  trainNumber: number;
  routeName: string;
  departureStation: string;
  arrivalStation: string;
  departureDate: Date;
  seatNumber: number;
  carriageNumber: number;
  totalPrice: number;
  status: TicketStatus;
  passengerName?: string;
  passengerSurname?: string;
  passengerPatronymic?: string;
  documentType?: IdDocumentType;
  idCard?: string;
}
