import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from '../employees/schemas/employee.entity';
import { RoutesModule } from '../routes/routes.module';
import { RouteStationEntity } from '../routes/schemas/route-station.entity';
import { RouteEntity } from '../routes/schemas/route.entity';
import { StationEntity } from '../stations/schemas/station.entity';
import { StationsModule } from '../stations/stations.module';
import { TrainEntity } from '../trains/schemas/train.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteEntity,
      StationEntity,
      TrainEntity,
      RouteStationEntity,
      EmployeeEntity,
    ]),
    RoutesModule,
    StationsModule,
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
