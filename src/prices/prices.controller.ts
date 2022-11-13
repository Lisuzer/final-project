import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PricesService } from './prices.service';

@ApiTags('prices')
@Controller('prices')
export class PricesController {
    constructor(
        private readonly priceServ: PricesService
    ) { }

    @Get()
    async index() {
        return this.priceServ.findAll()
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.priceServ.findOneById(id);
    }

    @Post()
    async create(@Body() dto: CreatePriceDto) {
        return this.priceServ.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePriceDto) {
        return this.priceServ.update(id, dto);
    }

    @Delete('id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.priceServ.delete(id);
    }
}
