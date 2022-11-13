import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { PriceEntity } from './schemas/price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceEntity])],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService]
})
export class PricesModule { }
