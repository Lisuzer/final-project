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
    private readonly stationRep: Repository<StationEntity>,
  ) {}

  async findOneById(id: string): Promise<StationEntity> {
    return await this.stationRep.findOneBy({ id });
  }

  async find(name?: string): Promise<StationEntity[]> {
    if (!name) {
      return await this.stationRep.find();
    } else {
      return await this.stationRep.find({ where: { name } });
    }
  }

  async create(dto: CreateStationDto): Promise<StationEntity> {
    const { code, name } = dto;
    const station = await this.stationRep.findOne({
      where: [{ code }, { name }],
    });
    if (station) {
      throw new BadRequestException(
        'station with this code/name already exist',
      );
    }
    return await this.stationRep.save(dto);
  }

  async update(id: string, dto: UpdateStationDto): Promise<StationEntity> {
    const { code, name } = dto;
    const station = await this.stationRep.findOneBy({ id });
    if (!station) {
      throw new BadRequestException('station not found');
    }
    if (code) {
      const existStations = await this.stationRep.findOne({ where: { code } });
      if (existStations) {
        throw new BadRequestException('station with this code already exist');
      }
      station.code = code;
    }
    if (name) {
      const existStations = await this.stationRep.findOne({ where: { name } });
      if (existStations) {
        throw new BadRequestException('station with this name already exist');
      }
      station.name = name;
    }
    await this.stationRep.update(id, station);
    return station;
  }

  async delete(id: string): Promise<StationEntity> {
    const station = await this.findOneById(id);
    if (!station) {
      throw new BadRequestException('station not found');
    }
    await this.stationRep.delete(station.id);
    return station;
  }
}
