import { Frequency } from '../../../routes/schemas/frequency.enum';
import { CarriageType } from '../../../carriages/schemas/carriage-type.enum';
import { TrainType } from '../../../trains/schemas/train-type.enum';
import { IdDocumentType } from '../../schemas/id-doc.enum';
import { TicketStatus } from '../../schemas/ticket-status.enum';

export const ticketStub = () => {
  return {
    id: '1',
    train: '1',
    user: '1',
    status: TicketStatus.BOOKED,
    price: {
      id: '73ac851e-03b4-4a9e-b38e-2c88bd874bb1',
      value: 520,
      trainType: TrainType.PASSENGER,
      carriageType: CarriageType.BERTH,
    },
    seatNumber: 1,
    carriage: {
      id: '0b1f3460-c6bc-464d-b855-282ff7604bbc',
      number: 4,
      seatCapacity: 3,
      carriageType: CarriageType.BERTH,
      trainId: 'a21dcb72-743d-4a30-b315-f3cab6d9089f',
    },
    passengerName: 'name',
    passengerSurname: 'surname',
    passengerPatronymic: 'patronymic',
    documentType: IdDocumentType.IDCARD,
    idCard: '1234567890',
    departureDate: '2022-12-12',
    departureStation: {
      id: '0f67171f-9a17-4258-a908-7776d183e277',
      name: 'Chornobaivka',
      code: 12,
    },
    arrivalStation: {
      id: '0f67171f-9a17-4258-a908-7776d183e277',
      name: 'Chornobaivka',
      code: 12,
    },
    route: {
      id: '028e3999-413a-4692-b0e3-e9a6a3648048',
      name: 'Velyka Progulka',
      frequency: [Frequency.DAILY],
      trainId: '64fa7fc4-ca2b-41cd-9f4a-94acf90b03fa',
    },
    totalPrice: 1000,
  };
};
