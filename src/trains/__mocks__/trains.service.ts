import { trainStub } from '../__tests__/stubs/train.stub';

export const TrainsService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([trainStub()]),
  findOneById: jest.fn().mockResolvedValue(trainStub()),
  create: jest.fn().mockResolvedValue(trainStub()),
  update: jest.fn().mockResolvedValue(trainStub()),
  delete: jest.fn().mockResolvedValue(trainStub()),
});
