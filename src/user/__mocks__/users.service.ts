import { userStub } from '../__tests__/stubs/user.stub';
import { userEmployeeStub } from '../__tests__/stubs/user-employee.stub';

export const UsersService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockReturnValue([userStub()]),
  findByEmail: jest.fn().mockReturnValue(userStub()),
  linkEmployeeAndUser: jest.fn().mockReturnValue(userEmployeeStub()),
  delete: jest.fn().mockReturnValue(userStub()),
});
