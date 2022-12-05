import { carriageStub } from '../__tests__/stubs/carriage.stub';

export const CarriagesService = jest.fn().mockReturnValue({
  find: jest.fn().mockReturnValue([carriageStub()]),
  findOneById: jest.fn().mockReturnValue(carriageStub()),
  create: jest.fn().mockReturnValue(carriageStub()),
  update: jest.fn().mockReturnValue(carriageStub()),
  delete: jest.fn().mockReturnValue(carriageStub()),
});
