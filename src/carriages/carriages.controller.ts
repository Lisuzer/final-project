import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarriagesService } from './carriages.service';
import { CreateCarriageDto } from './dto/create-carriage.dto';
import { UpdateCarriageDto } from './dto/update-carriage.dto';

@ApiTags('carriages')
@Controller('carriages')
export class CarriagesController {
    constructor(
        private readonly carriagesServ: CarriagesService
    ) { }

    @Get()
    async index() {
        return this.carriagesServ.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.carriagesServ.findOneById(id);
    }

    @Post()
    async create(@Body() dto: CreateCarriageDto) {
        return this.carriagesServ.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCarriageDto) {
        return this.carriagesServ.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.carriagesServ.delete(id);
    }
}
