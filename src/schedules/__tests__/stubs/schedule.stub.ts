import { Frequency } from '../../../routes/schemas/frequency.enum';

export const scheduleStub = () => {
  return {
    station: {
      date: '2020-12-12',
      station: {
        id: '5fcf9b9b9b9b9b9b9b9b9b9b',
        name: 'stationName',
        code: 12,
      },
    },
    routes: [
      {
        routeId: '5fcf9b9b9b9b9b9b9b9b9b9b',
        routeName: 'routeName',
        frequency: [Frequency.DAILY],
        arrivalTime: '18-00',
        departureTime: '18-30',
      },
    ],
  };
};
