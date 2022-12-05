import { employeeStub } from '../__tests__/stubs/employee.stub';

export const EmployeesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([employeeStub()]),
  findOneById: jest.fn().mockResolvedValue(employeeStub()),
  create: jest.fn().mockResolvedValue(employeeStub()),
  update: jest.fn().mockResolvedValue(employeeStub()),
  delete: jest.fn().mockResolvedValue(employeeStub()),
});
