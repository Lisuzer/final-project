import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';

@Module({
  providers: [TrainsService],
  controllers: [TrainsController]
})
export class TrainsModule {}
