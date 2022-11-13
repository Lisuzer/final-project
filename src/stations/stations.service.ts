import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { StationEntity } from './schemas/station.entity';

@Injectable()
export class StationsService {
    constructor(
        @InjectRepository(StationEntity)
        private readonly stationRep: Repository<StationEntity>
    ) { }

    async findOneById(id: string): Promise<StationEntity> {
        return await this.stationRep.findOneBy({ id });
    }

    async findAll(): Promise<StationEntity[]> {
        return await this.stationRep.find();
    }

    async findByCode(code: number): Promise<StationEntity> {
        return await this.stationRep.findOneBy({ code });
    }

    async create(dto: CreateStationDto): Promise<StationEntity> {
        return await this.stationRep.save(dto);
    }

    async update(id: string, dto: UpdateStationDto): Promise<StationEntity> {
        const { code, ...rest } = dto;
        const station = await this.findOneById(id);
        if (!station) {
            throw new BadRequestException("station not found");
        }
        if (code) {
            const stationWithCode = await this.findByCode(code);
            if (stationWithCode) {
                throw new BadRequestException('station with this code already exist')
            }
            station.code = code;
        }
        Object.keys(rest).forEach((key) => {
            if (station[key]) {
                station[key] = rest[key];
            } else {
                throw new BadRequestException(`Unexpected field [${key}]`);
            }
        });
        await this.stationRep.update(id, station);
        return station;
    }

    async delete(id: string) {
        const station = await this.findOneById(id);
        if (!station) {
            throw new BadRequestException("station not found");
        }
        await this.stationRep.delete(station.id);
        return station;
    }
}
