import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarriageEntity } from '../carriages/schemas/carriage.entity';
import { PriceEntity } from '../prices/schemas/price.entity';
import { RouteStationEntity } from '../routes/schemas/route-station.entity';
import { RouteEntity } from '../routes/schemas/route.entity';
import { StationEntity } from '../stations/schemas/station.entity';
import { TrainEntity } from '../trains/schemas/train.entity';
import { UserEntity } from '../user/schemas/user.entity';
import { TicketEntity } from './schemas/ticket.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TicketEntity,
      PriceEntity,
      TrainEntity,
      CarriageEntity,
      UserEntity,
      RouteEntity,
      RouteStationEntity,
      StationEntity,
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
