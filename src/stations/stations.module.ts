import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationEntity } from './schemas/station.entity';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService]
})
export class StationsModule { }
