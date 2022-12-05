import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainEntity } from './schemas/train.entity';
import { EmployeeEntity } from '../employees/schemas/employee.entity';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainEntity, EmployeeEntity]),
    EmployeesModule,
  ],
  providers: [TrainsService],
  controllers: [TrainsController],
  exports: [TrainsService],
})
export class TrainsModule {}
