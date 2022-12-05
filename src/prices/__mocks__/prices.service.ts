import { priceStub } from '../__tests__/stubs/price.stub';

export const PricesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([priceStub()]),
  findOneById: jest.fn().mockResolvedValue(priceStub()),
  create: jest.fn().mockResolvedValue(priceStub()),
  update: jest.fn().mockResolvedValue(priceStub()),
  delete: jest.fn().mockResolvedValue(priceStub()),
});
