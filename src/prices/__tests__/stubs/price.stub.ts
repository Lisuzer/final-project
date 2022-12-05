import { CarriageType } from '../../../carriages/schemas/carriage-type.enum';
import { TrainType } from '../../../trains/schemas/train-type.enum';

export const priceStub = () => {
  return {
    id: '73ac851e-03b4-4a9e-b38e-2c88bd874bb1',
    value: 520,
    trainType: TrainType.PASSENGER,
    carriageType: CarriageType.BERTH,
  };
};
