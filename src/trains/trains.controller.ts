import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainsService } from './trains.service';

@ApiTags('trains')
@Controller('trains')
export class TrainsController {
    constructor(
        private readonly trainServ: TrainsService
    ) { }

    @Get()
    async index() {
        return this.trainServ.findAll();
    }


    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.trainServ.findOneById(id);
    }

    @Post()
    async create(@Body() dto: CreateTrainDto) {
        return this.trainServ.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTrainDto) {
        return this.trainServ.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.trainServ.delete(id);
    }
}
