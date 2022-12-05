import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PriceEntity } from './schemas/price.entity';
import { FindByTypesDto } from './dto/find-by-types.dto';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(PriceEntity)
    private readonly priceRep: Repository<PriceEntity>,
  ) {}

  async findOneById(id: string): Promise<PriceEntity> {
    return await this.priceRep.findOneBy({ id });
  }

  async findAll(): Promise<PriceEntity[]> {
    return await this.priceRep.find();
  }

  async create(dto: CreatePriceDto): Promise<PriceEntity> {
    const { carriageType, trainType, ...rest } = dto;
    const prices = await this.findAll();
    prices.forEach((el) => {
      if (el.carriageType == carriageType && el.trainType == trainType) {
        throw new BadRequestException('price with both types already exist');
      }
    });
    return await this.priceRep.save({ carriageType, trainType, ...rest });
  }

  async update(id: string, dto: UpdatePriceDto): Promise<PriceEntity> {
    const { value } = dto;
    const price = await this.findOneById(id);
    if (!price) {
      throw new BadRequestException('Price not founded');
    }
    price.value = value;
    await this.priceRep.update(price.id, price);
    return price;
  }

  async delete(id: string): Promise<PriceEntity> {
    const price = await this.findOneById(id);
    if (!price) {
      throw new BadRequestException('Price not founded');
    }
    await this.priceRep.delete(price.id);
    return price;
  }

  async getByTypes(dto: FindByTypesDto): Promise<PriceEntity> {
    const { carriageType, trainType } = dto;
    const price = await this.priceRep.findOne({
      where: { carriageType, trainType },
    });
    if (!price) {
      throw new BadRequestException('Price not founded');
    }
    return price;
  }
}
