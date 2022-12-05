import { TestingModule, Test } from '@nestjs/testing';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { mockJwtAuthGuard } from '../../auth/__mocks__/jwt-auth.goard';
import { mockRolesGuard } from '../../auth/__mocks__/roles.guard';
import { StationEntity } from '../schemas/station.entity';
import { StationsController } from '../stations.controller';
import { StationsService } from '../stations.service';
import { stationStub } from './stubs/station.stub';

jest.mock('../stations.service.ts');

describe('StationsController', () => {
  let controller: StationsController;
  let service: StationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationsController],
      providers: [
        StationsService,
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard() },
        { provide: RolesGuard, useValue: mockRolesGuard() },
      ],
    }).compile();

    controller = module.get<StationsController>(StationsController);
    service = module.get<StationsService>(StationsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    describe('find all', () => {
      let stations: StationEntity[];
      beforeEach(async () => {
        stations = await controller.find();
      });

      it('station service should be called', () => {
        expect(service.find).toHaveBeenCalled();
      });

      it('sould return array of stations', () => {
        expect(stations).toEqual([stationStub()]);
      });
    });

    describe('find by id', () => {
      let station: StationEntity;
      const id = '0f67171f-9a17-4258-a908-7776d183e277';

      beforeEach(async () => {
        station = await controller.findById(id);
      });
      it('station service should be called', () => {
        expect(service.findOneById).toHaveBeenCalledWith(id);
      });
      it('should return station', () => {
        expect(station).toEqual(stationStub());
      });
    });

    describe('create', () => {
      let station: StationEntity;
      const dto = {
        name: 'Chornobaivka',
        code: 12,
      };

      beforeEach(async () => {
        station = await controller.create(dto);
      });

      it('station service should be called', () => {
        expect(service.create).toHaveBeenCalledWith(dto);
      });

      it('should return station', () => {
        expect(station).toEqual(stationStub());
      });
    });

    describe('update', () => {
      let station: StationEntity;
      const id = '0f67171f-9a17-4258-a908-7776d183e277';
      const dto = {
        name: 'Chornobaivka',
        code: 12,
      };

      beforeEach(async () => {
        station = await controller.update(id, dto);
      });

      it('station service should be called', () => {
        expect(service.update).toHaveBeenCalledWith(id, dto);
      });

      it('should return station', () => {
        expect(station).toEqual(stationStub());
      });
    });

    describe('delete', () => {
      let station: StationEntity;
      const id = '0f67171f-9a17-4258-a908-7776d183e277';

      beforeEach(async () => {
        station = await controller.delete(id);
      });

      it('station service should be called', () => {
        expect(service.delete).toHaveBeenCalledWith(id);
      });

      it('should return station', () => {
        expect(station).toEqual(stationStub());
      });
    });
  });
});
