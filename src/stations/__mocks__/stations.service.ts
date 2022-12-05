import { stationStub } from '../__tests__/stubs/station.stub';

export const StationsService = jest.fn().mockReturnValue({
  find: jest.fn().mockReturnValue([stationStub()]),
  findOneById: jest.fn().mockReturnValue(stationStub()),
  create: jest.fn().mockReturnValue(stationStub()),
  update: jest.fn().mockReturnValue(stationStub()),
  delete: jest.fn().mockReturnValue(stationStub()),
});
