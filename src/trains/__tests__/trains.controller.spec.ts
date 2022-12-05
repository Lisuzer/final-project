import { TestingModule, Test } from '@nestjs/testing';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { mockJwtAuthGuard } from '../../auth/__mocks__/jwt-auth.goard';
import { mockRolesGuard } from '../../auth/__mocks__/roles.guard';
import { TrainType } from '../schemas/train-type.enum';
import { TrainEntity } from '../schemas/train.entity';
import { TrainsController } from '../trains.controller';
import { TrainsService } from '../trains.service';
import { trainStub } from './stubs/train.stub';

jest.mock('../trains.service.ts');

describe('TrainsController', () => {
  let controller: TrainsController;
  let service: TrainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainsController],
      providers: [
        TrainsService,
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard() },
        { provide: RolesGuard, useValue: mockRolesGuard() },
      ],
    }).compile();

    controller = module.get<TrainsController>(TrainsController);
    service = module.get<TrainsService>(TrainsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    describe('find all', () => {
      let trains: TrainEntity[];
      beforeEach(async () => {
        trains = await controller.findAll();
      });

      it('train service should be called', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      it('sould return array of trains', () => {
        expect(trains).toEqual([trainStub()]);
      });
    });

    describe('find by id', () => {
      let train: TrainEntity;
      const id = '0f67171f-9a17-4258-a908-7776d183e277';

      beforeEach(async () => {
        train = await controller.findById(id);
      });
      it('train service should be called', () => {
        expect(service.findOneById).toHaveBeenCalledWith(id);
      });
      it('should return train', () => {
        expect(train).toEqual(trainStub());
      });
    });
  });

  describe('create', () => {
    let train: TrainEntity;
    const dto = {
      number: 2,
      trainType: TrainType.PASSENGER,
    };

    beforeEach(async () => {
      train = await controller.create(dto);
    });

    it('train service should be called', () => {
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should return train', () => {
      expect(train).toEqual(trainStub());
    });
  });

  describe('update', () => {
    let train: TrainEntity;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';
    const dto = {
      number: 2,
      trainType: TrainType.PASSENGER,
    };

    beforeEach(async () => {
      train = await controller.update(id, dto);
    });

    it('train service should be called', () => {
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });

    it('should return train', () => {
      expect(train).toEqual(trainStub());
    });
  });

  describe('delete', () => {
    let train: TrainEntity;
    const id = '0f67171f-9a17-4258-a908-7776d183e277';

    beforeEach(async () => {
      train = await controller.delete(id);
    });

    it('train service should be called', () => {
      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('should return train', () => {
      expect(train).toEqual(trainStub());
    });
  });
});
