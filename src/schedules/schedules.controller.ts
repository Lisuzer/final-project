import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetScheduleDto } from './dto/get-schedule.dto';
import { SchedulesService } from './schedules.service';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiOperation({
    description: 'Getting schedule by exact station | Required roles: Guest',
  })
  @Get()
  async findOne(@Query() dto: GetScheduleDto) {
    return await this.schedulesService.findOne(dto);
  }
}
