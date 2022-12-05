import { IRoute } from '../../routes/interfaces/route.interface';
import { CarriageType } from '../../carriages/schemas/carriage-type.enum';
import { TrainType } from '../schemas/train-type.enum';

export interface ITrainRoutes {
  id: string;
  trainNumber: number;
  trainType: TrainType;
  routes: IRoute[];
  carriages: ICarriage[];
}

export interface ICarriage {
  id: string;
  number: number;
  carriageType: CarriageType;
}
