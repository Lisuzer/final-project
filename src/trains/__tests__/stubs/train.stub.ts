import { TrainType } from '../../schemas/train-type.enum';

export const trainStub = () => {
  return {
    id: '64fa7fc4-ca2b-41cd-9f4a-94acf90b03fa',
    number: 2,
    trainType: TrainType.PASSENGER,
  };
};
