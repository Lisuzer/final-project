import { Frequency } from '../schemas/frequency.enum';

export interface IRoute {
  id: string;
  name: string;
  frequency: Frequency[];
  stations: IStation[];
}

export interface IStation {
  id: string;
  name: string;
  code: number;
  arrivalTime: string;
  departureTime: string;
}
