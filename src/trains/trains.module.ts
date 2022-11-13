import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainEntity } from './schemas/train.entity';
import { EmployeeEntity } from 'src/employees/schemas/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainEntity, EmployeeEntity])],
  providers: [TrainsService],
  controllers: [TrainsController],
  exports: [TrainsService]
})
export class TrainsModule { }
