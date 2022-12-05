import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesModule } from '../../employees/employees.module';
import { TrainsModule } from '../../trains/trains.module';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { mockJwtAuthGuard } from '../../auth/__mocks__/jwt-auth.goard';
import { mockRolesGuard } from '../../auth/__mocks__/roles.guard';
import { CarriagesController } from '../carriages.controller';
import { CarriagesService } from '../carriages.service';
import { CarriageType } from '../schemas/carriage-type.enum';
import { CarriageEntity } from '../schemas/carriage.entity';
import { carriageStub } from './stubs/carriage.stub';

jest.mock('../carriages.service');

describe('CarriagesController', () => {
  let controller: CarriagesController;
  let service: CarriagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarriagesController],
      providers: [
        CarriagesService,
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard() },
        { provide: RolesGuard, useValue: mockRolesGuard() },
      ],
    }).compile();

    controller = module.get<CarriagesController>(CarriagesController);
    service = module.get<CarriagesService>(CarriagesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    describe('find all', () => {
      let carriages: CarriageEntity[];
      beforeEach(async () => {
        carriages = await controller.find();
      });

      it('carriages service should be called', () => {
        expect(service.find).toHaveBeenCalled();
      });

      it('sould return array of carriages', () => {
        expect(carriages).toEqual([carriageStub()]);
      });
    });

    describe('find by id', () => {
      let carriage: CarriageEntity;
      const id = '0f67171f-9a17-4258-a908-7776d183e277';

      beforeEach(async () => {
        carriage = await controller.findById(id);
      });

      it('carriages service should be called', () => {
        expect(service.findOneById).toHaveBeenCalledWith(id);
      });

      it('should return carriage', () => {
        expect(carriage).toEqual(carriageStub());
      });
    });
  });

  describe('create', () => {
    let carriage: CarriageEntity;
    const dto = {
      number: 3,
      carriageType: CarriageType.BERTH,
      train: '0f67171f-9a17-4258-a908-7776d183e277',
      seatCapacity: 3,
    };

    beforeEach(async () => {
      carriage = await controller.create(dto);
    });

    it('carriages service should be called', () => {
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('sould return carriage', () => {
      expect(carriage).toEqual(carriageStub());
    });
  });

  describe('update', () => {
    let carriage: CarriageEntity;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';
    const dto = {
      number: 3,
      carriageType: CarriageType.BERTH,
      train: '0f67171f-9a17-4258-a908-7776d183e277',
      seatCapacity: 3,
    };

    beforeEach(async () => {
      carriage = await controller.update(id, dto);
    });

    it('carriages service should be called', () => {
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });

    it('sould return carriage', () => {
      expect(carriage).toEqual(carriageStub());
    });
  });

  describe('delete', () => {
    let carriage: CarriageEntity;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';

    beforeEach(async () => {
      carriage = await controller.delete(id);
    });

    it('carriages service should be called', () => {
      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('sould return carriage', () => {
      expect(carriage).toEqual(carriageStub());
    });
  });
});
