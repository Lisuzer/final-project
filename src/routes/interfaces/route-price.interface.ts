import { CarriageType } from 'src/carriages/schemas/carriage-type.enum';
import { TrainType } from 'src/trains/schemas/train-type.enum';
import { Frequency } from '../schemas/frequency.enum';
export interface IRoutePrices {
  id: string;
  name: string;
  frequency: Frequency[];
  trainNumber: number;
  prices: PricesInterface[];
}

export interface PricesInterface {
  trainType: TrainType;
  carriageType: CarriageType;
  totalPrice: number;
}
