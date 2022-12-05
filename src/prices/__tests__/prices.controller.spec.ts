import { TestingModule, Test } from '@nestjs/testing';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { mockJwtAuthGuard } from '../../auth/__mocks__/jwt-auth.goard';
import { mockRolesGuard } from '../../auth/__mocks__/roles.guard';
import { CarriageType } from '../../carriages/schemas/carriage-type.enum';
import { TrainType } from '../../trains/schemas/train-type.enum';
import { PricesController } from '../prices.controller';
import { PricesService } from '../prices.service';
import { PriceEntity } from '../schemas/price.entity';
import { priceStub } from './stubs/price.stub';

jest.mock('../prices.service.ts');

describe('PricesController', () => {
  let controller: PricesController;
  let service: PricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricesController],
      providers: [
        PricesService,
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard() },
        { provide: RolesGuard, useValue: mockRolesGuard() },
      ],
    }).compile();

    controller = module.get<PricesController>(PricesController);
    service = module.get<PricesService>(PricesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    describe('find all', () => {
      let prices: PriceEntity[];
      beforeEach(async () => {
        prices = await controller.findAll();
      });

      it('price service should be called', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      it('sould return array of prices', () => {
        expect(prices).toEqual([priceStub()]);
      });
    });

    describe('find by id', () => {
      let price: PriceEntity;
      const id = '0f67171f-9a17-4258-a908-7776d183e277';

      beforeEach(async () => {
        price = await controller.findById(id);
      });
      it('price service should be called', () => {
        expect(service.findOneById).toHaveBeenCalledWith(id);
      });
      it('should return price', () => {
        expect(price).toEqual(priceStub());
      });
    });
  });

  describe('create', () => {
    let price: PriceEntity;
    const priceDto = {
      value: 520,
      trainType: TrainType.PASSENGER,
      carriageType: CarriageType.BERTH,
    };

    beforeEach(async () => {
      price = await controller.create(priceDto);
    });

    it('price service should be called', () => {
      expect(service.create).toHaveBeenCalledWith(priceDto);
    });

    it('should return price', () => {
      expect(price).toEqual(priceStub());
    });
  });

  describe('update', () => {
    let price: PriceEntity;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';
    const priceDto = {
      value: 520,
      trainType: TrainType.PASSENGER,
      carriageType: CarriageType.BERTH,
    };

    beforeEach(async () => {
      price = await controller.update(id, priceDto);
    });

    it('price service should be called', () => {
      expect(service.update).toHaveBeenCalledWith(id, priceDto);
    });

    it('should return price', () => {
      expect(price).toEqual(priceStub());
    });
  });

  describe('delete', () => {
    let price: PriceEntity;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';

    beforeEach(async () => {
      price = await controller.delete(id);
    });

    it('price service should be called', () => {
      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('should return price', () => {
      expect(price).toEqual(priceStub());
    });
  });
});
