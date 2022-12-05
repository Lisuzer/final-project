import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UserEntity } from '../schemas/user.entity';
import { userStub } from './stubs/user.stub';
import { userEmployeeStub } from './stubs/user-employee.stub';
import { RolesGuard } from '../../auth/guards/role.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { mockJwtAuthGuard } from '../../auth/__mocks__/jwt-auth.goard';
import { mockRolesGuard } from '../../auth/__mocks__/roles.guard';

jest.mock('../users.service.ts');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard() },
        { provide: RolesGuard, useValue: mockRolesGuard() },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    describe('find all', () => {
      let users: UserEntity[];
      beforeEach(async () => {
        users = await controller.findAll();
      });

      it('user service should be called', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      it('sould return array of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });

    describe('find by email', () => {
      let user: UserEntity;
      const email = 'random@example.com';

      beforeEach(async () => {
        user = await controller.findByEmail(email);
      });

      it('user service should be called', () => {
        expect(service.findByEmail).toHaveBeenCalledWith(email);
      });

      it('should find and return user by email', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('link employee and user', () => {
    let user: UserEntity;
    const dto = {
      userId: '2bdcb60b-e5ac-4e84-8047-65c6dae2952f',
      employeeId: '2b5c494d-3fbe-4aa1-9814-f780f80af3a9',
    };

    beforeEach(async () => {
      user = await controller.linkEmployeeAndUser(dto);
    });

    it('user service should be called', () => {
      expect(service.linkEmployeeAndUser).toHaveBeenCalledWith(dto);
    });

    it('should return user', () => {
      expect(user).toEqual(userEmployeeStub());
    });
  });

  describe('delete', () => {
    let user: UserEntity;
    const id = '2bdcb60b-e5ac-4e84-8047-65c6dae2952f';

    beforeEach(async () => {
      user = await controller.delete(id);
    });

    it('user service should be called', () => {
      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('should return user', () => {
      expect(user).toEqual(userStub());
    });
  });
});
