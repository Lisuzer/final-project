import { routePricesStub } from '../__tests__/stubs/route-prices.stub';
import { routeStub } from '../__tests__/stubs/route.stub';

export const RoutesService = jest.fn().mockReturnValue({
  find: jest.fn().mockReturnValue([routeStub()]),
  findOneById: jest.fn().mockReturnValue(routeStub()),
  create: jest.fn().mockReturnValue(routeStub()),
  update: jest.fn().mockReturnValue(routeStub()),
  delete: jest.fn().mockReturnValue(routeStub()),
  findByStations: jest.fn().mockReturnValue(routePricesStub()),
});
