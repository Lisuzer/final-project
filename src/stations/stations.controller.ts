import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { StationsService } from './stations.service';

@ApiTags('stations')
@Controller('stations')
export class StationsController {
    constructor(
        private readonly stationsServ: StationsService,
    ) { }


    @Get()
    async findAll() {
        return this.stationsServ.findAll();
    }

    @Get(':id')
    async find(@Param('id', ParseUUIDPipe) id: string) {
        return this.stationsServ.findOneById(id);
    }

    @Post()
    async create(@Body() dto: CreateStationDto) {
        return this.stationsServ.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateStationDto) {
        return this.stationsServ.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.stationsServ.delete(id);
    }
}
