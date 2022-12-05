import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarriageEntity } from '../carriages/schemas/carriage.entity';
import { EmployeeEntity } from '../employees/schemas/employee.entity';
import { PriceEntity } from '../prices/schemas/price.entity';
import { StationEntity } from '../stations/schemas/station.entity';
import { TrainEntity } from '../trains/schemas/train.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { RouteStationEntity } from './schemas/route-station.entity';
import { RouteEntity } from './schemas/route.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteEntity,
      StationEntity,
      RouteStationEntity,
      TrainEntity,
      EmployeeEntity,
      PriceEntity,
      CarriageEntity,
    ]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService],
})
export class RoutesModule {}
