import { TestingModule, Test } from '@nestjs/testing';
import { GetScheduleDto } from '../dto/get-schedule.dto';
import { ISchedule } from '../interfaces/schedule.interface';
import { SchedulesController } from '../schedules.controller';
import { SchedulesService } from '../schedules.service';
import { scheduleStub } from './stubs/schedule.stub';

jest.mock('../schedules.service');

describe('SchedulesController', () => {
  let controller: SchedulesController;
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [SchedulesService],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    service = module.get<SchedulesService>(SchedulesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    let schedule: ISchedule;
    const dto: GetScheduleDto = {
      stationName: 'stationName',
      date: '2022-11-11',
    };

    beforeEach(async () => {
      schedule = await controller.findOne(dto);
    });

    it('schedules service should be called', () => {
      expect(service.findOne).toHaveBeenCalledWith(dto);
    });

    it('should return schedule', () => {
      expect(schedule).toEqual(scheduleStub());
    });
  });
});
