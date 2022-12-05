import { TestingModule, Test } from '@nestjs/testing';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { mockJwtAuthGuard } from '../../auth/__mocks__/jwt-auth.goard';
import { mockRolesGuard } from '../../auth/__mocks__/roles.guard';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';
import { EmployeeEntity } from '../schemas/employee.entity';
import { employeeStub } from './stubs/employee.stub';

jest.mock('../employees.service.ts');

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard() },
        { provide: RolesGuard, useValue: mockRolesGuard() },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    describe('find all', () => {
      let employees: EmployeeEntity[];
      beforeEach(async () => {
        employees = await controller.findAll();
      });

      it('employee service should be called', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      it('sould return array of employees', () => {
        expect(employees).toEqual([employeeStub()]);
      });
    });

    describe('find by id', () => {
      let employee: EmployeeEntity;
      const id = '0f67171f-9a17-4258-a908-7776d183e277';

      beforeEach(async () => {
        employee = await controller.findOneById(id);
      });
      it('employee service should be called', () => {
        expect(service.findOneById).toHaveBeenCalledWith(id);
      });
      it('should return employee', () => {
        expect(employee).toEqual(employeeStub());
      });
    });
  });

  describe('create', () => {
    let employee: EmployeeEntity;
    const dto = {
      name: 'John',
      surname: 'Doe',
      birthday: new Date('2002-12-12'),
      post: 'MANAGER',
      careerStart: new Date('2019-12-12'),
      adress: 'plitkova st.',
      contactNumber: '380663781685',
    };

    beforeEach(async () => {
      employee = await controller.create(dto);
    });

    it('employee service should be called', () => {
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should return employee', () => {
      expect(employee).toEqual(employeeStub());
    });
  });

  describe('update', () => {
    let employee: EmployeeEntity;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';
    const dto = {
      name: 'John',
      surname: 'Doe',
      birthday: new Date('2002-12-12'),
      post: 'MANAGER',
      careerStart: new Date('2019-12-12'),
      adress: 'plitkova st.',
      contactNumber: '380663781685',
    };

    beforeEach(async () => {
      employee = await controller.update(id, dto);
    });

    it('employee service should be called', () => {
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });

    it('should return employee', () => {
      expect(employee).toEqual(employeeStub());
    });
  });

  describe('delete', () => {
    let employee: EmployeeEntity;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';

    beforeEach(async () => {
      employee = await controller.delete(id);
    });

    it('employee service should be called', () => {
      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('should return employee', () => {
      expect(employee).toEqual(employeeStub());
    });
  });
});
