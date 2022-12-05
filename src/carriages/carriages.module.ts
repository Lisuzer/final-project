import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/employees/employees.module';
import { EmployeeEntity } from 'src/employees/schemas/employee.entity';
import { TrainEntity } from 'src/trains/schemas/train.entity';
import { TrainsModule } from 'src/trains/trains.module';
import { CarriagesController } from './carriages.controller';
import { CarriagesService } from './carriages.service';
import { CarriageEntity } from './schemas/carriage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarriageEntity, EmployeeEntity, TrainEntity]),
    TrainsModule,
    EmployeesModule,
  ],
  controllers: [CarriagesController],
  providers: [CarriagesService],
  exports: [CarriagesService],
})
export class CarriagesModule {}
