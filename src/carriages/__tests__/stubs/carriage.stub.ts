import { CarriageType } from '../../schemas/carriage-type.enum';

export const carriageStub = () => {
  return {
    id: '0b1f3460-c6bc-464d-b855-282ff7604bbc',
    number: 4,
    seatCapacity: 3,
    carriageType: CarriageType.BERTH,
    trainId: 'a21dcb72-743d-4a30-b315-f3cab6d9089f',
  };
};
