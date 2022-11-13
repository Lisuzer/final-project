import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from 'src/employees/employees.service';
import { EmployeeEntity } from 'src/employees/schemas/employee.entity';
import { TrainEntity } from 'src/trains/schemas/train.entity';
import { TrainsService } from 'src/trains/trains.service';
import { CarriagesController } from './carriages.controller';
import { CarriagesService } from './carriages.service';
import { CarriageEntity } from './schemas/carriage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarriageEntity, EmployeeEntity, TrainEntity])],
  controllers: [CarriagesController],
  providers: [CarriagesService, EmployeesService, TrainsService],
  exports: [CarriagesService]
})
export class CarriagesModule { }
