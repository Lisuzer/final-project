import { TestingModule, Test } from '@nestjs/testing';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserRole } from '../../user/schemas/user-role.enum';
import { UserEntity } from '../../user/schemas/user.entity';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { ChangeUserRoleDto } from '../dto/change-user-role.dto';
import { LoginUserDto } from '../dto/login.user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { IToken } from '../interfaces/token.interface';
import { authStub } from './stubs/auth.stub';
import { userStub } from './stubs/user.stub';

jest.mock('../auth.service');

describe('AuthController', () => {
  let service: AuthService;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    let accessToken: IToken;
    const dto: LoginUserDto = {
      email: 'manager@example.com',
      password: 'password',
    };

    beforeEach(async () => {
      accessToken = await controller.login(dto);
    });

    it('auth service should be called', () => {
      expect(service.login).toHaveBeenCalledWith(dto);
    });

    it('should return access token', () => {
      expect(accessToken).toEqual(authStub());
    });
  });

  describe('register', () => {
    let user: IToken;
    const dto: RegisterUserDto = {
      email: 'manager@example.com',
      password: 'password',
    };

    beforeEach(async () => {
      user = await controller.register(dto);
    });

    it('auth service should be called', () => {
      expect(service.register).toHaveBeenCalledWith(dto);
    });

    it('should return access token', () => {
      expect(user).toEqual(authStub());
    });
  });

  describe('update profile', () => {
    let user: UserEntity;
    const userFromToken = {
      user: {
        email: 'manager@example.com',
        id: '2bdcb60b-e5ac-4e84-8047-65c6dae2952f',
        role: UserRole.MANAGER,
      },
    };
    const dto: UpdateUserDto = {
      email: 'manager@example.com',
    };

    beforeEach(async () => {
      user = await controller.updateProfile(dto, userFromToken);
    });

    it('auth service should be called', () => {
      expect(service.updateProfile).toHaveBeenCalledWith(dto, userFromToken);
    });

    it('should return user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('change user role', () => {
    let user: UserEntity;
    const dto: ChangeUserRoleDto = {
      userId: '2bdcb60b-e5ac-4e84-8047-65c6dae2952f',
      role: UserRole.MANAGER,
    };

    beforeEach(async () => {
      user = await controller.changeRole(dto);
    });

    it('auth service should be called', () => {
      expect(service.changeUserRole).toHaveBeenCalledWith(dto);
    });

    it('should return user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('get user', () => {
    let user: UserEntity;
    const userFromToken = {
      user: {
        email: 'manager@example.com',
        id: '2bdcb60b-e5ac-4e84-8047-65c6dae2952f',
        role: UserRole.MANAGER,
      },
    };

    beforeEach(async () => {
      user = await controller.getUser(userFromToken);
    });

    it('auth service should be called', () => {
      expect(service.getUser).toHaveBeenCalledWith(userFromToken);
    });

    it('should return user', () => {
      expect(user).toEqual(userStub());
    });
  });
});
