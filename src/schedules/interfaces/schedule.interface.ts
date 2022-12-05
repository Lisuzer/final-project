import { Frequency } from '../../routes/schemas/frequency.enum';
import { StationEntity } from '../../stations/schemas/station.entity';

export interface ISchedule {
  date: string;
  station: {
    id: string;
    name: string;
    code: number;
  };
  routes: {
    routeId: string;
    routeName: string;
    frequency: Frequency[];
    arrivalTime: string;
    departureTime: string;
  }[];
}
