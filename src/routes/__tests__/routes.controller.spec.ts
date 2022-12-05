import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { mockJwtAuthGuard } from '../../auth/__mocks__/jwt-auth.goard';
import { mockRolesGuard } from '../../auth/__mocks__/roles.guard';
import { StationElementDto } from '../dto/create-route-station.dto';
import { RoutesController } from '../routes.controller';
import { RoutesService } from '../routes.service';
import { Frequency } from '../schemas/frequency.enum';
import { routePricesStub } from './stubs/route-prices.stub';
import { routeStub } from './stubs/route.stub';

jest.mock('../routes.service');

describe('RoutesController', () => {
  let service: RoutesService;
  let controller: RoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutesController],
      providers: [
        RoutesService,
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard },
        { provide: Roles, useValue: mockRolesGuard },
      ],
    }).compile();

    service = module.get<RoutesService>(RoutesService);
    controller = module.get<RoutesController>(RoutesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    describe('find all', () => {
      let routes: any[];
      beforeEach(async () => {
        routes = await controller.find();
      });

      it('routes service should be called', () => {
        expect(service.find).toHaveBeenCalled();
      });

      it('sould return array of routes', () => {
        expect(routes).toEqual([routeStub()]);
      });
    });

    describe('find by id', () => {
      let route: any;
      const id = '0f67171f-9a17-4258-a908-7776d183e277';

      beforeEach(async () => {
        route = await controller.findOneById(id);
      });

      it('routes service should be called', () => {
        expect(service.findOneById).toHaveBeenCalledWith(id);
      });

      it('should return route', () => {
        expect(route).toEqual(routeStub());
      });
    });

    describe('find by stations', () => {
      let route: any;
      const startStation = '0f67171f-9a17-4258-a908-7776d183e277';
      const endStation = '0f67171f-9a17-4258-a908-7776d183e277';

      beforeEach(async () => {
        route = await controller.findByStations(startStation, endStation);
      });

      it('routes service should be called', () => {
        expect(service.findByStations).toHaveBeenCalledWith({
          startStation,
          endStation,
        });
      });

      it('should return route', () => {
        expect(route).toEqual(routePricesStub());
      });
    });
  });

  describe('create', () => {
    let route: any;
    const dto = {
      train: '0f67171f-9a17-4258-a908-7776d183e277',
      stations: [
        {
          stationId: '0f67171f-9a17-4258-a908-7776d183e277',
          arrivalTime: '2021-05-01',
          departureTime: '2021-05-01',
        } as StationElementDto,
      ],
      name: 'test',
      frequency: [Frequency.DAILY],
    };

    beforeEach(async () => {
      route = await controller.create(dto);
    });

    it('routes service should be called', () => {
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should return route', () => {
      expect(route).toEqual(routeStub());
    });
  });

  describe('delete', () => {
    let route: any;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';

    beforeEach(async () => {
      route = await controller.delete(id);
    });

    it('routes service should be called', () => {
      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('should return route', () => {
      expect(route).toEqual(routeStub());
    });
  });
});
