import { authStub } from '../__tests__/stubs/auth.stub';
import { userStub } from '../__tests__/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockReturnValue(authStub()),
  register: jest.fn().mockReturnValue(authStub()),
  changeUserRole: jest.fn().mockReturnValue(userStub()),
  getUser: jest.fn().mockReturnValue(userStub()),
  updateProfile: jest.fn().mockReturnValue(userStub()),
});
