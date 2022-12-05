import { scheduleStub } from '../__tests__/stubs/schedule.stub';

export const SchedulesService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockReturnValue(scheduleStub()),
});
