import { CarriageType } from '../../../carriages/schemas/carriage-type.enum';
import { TrainType } from '../../../trains/schemas/train-type.enum';
import { Frequency } from '../../schemas/frequency.enum';

export const routePricesStub = () => {
  return {
    route: {
      id: '028e3999-413a-4692-b0e3-e9a6a3648048',
      name: 'Velyka Progulka',
      trainId: '64fa7fc4-ca2b-41cd-9f4a-94acf90b03fa',
      frequency: [Frequency.DAILY],
      prices: [
        {
          totalPrice: 100,
          trainType: TrainType.PASSENGER,
          carriageType: CarriageType.BERTH,
        },
      ],
    },
  };
};
