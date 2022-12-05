import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeesService } from '../employees/employees.service';
import { Repository } from 'typeorm';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainEntity } from './schemas/train.entity';
import { ITrainRoutes } from './interfaces/train-routes.interface';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(TrainEntity)
    private readonly trainRep: Repository<TrainEntity>,
    private readonly employeesService: EmployeesService,
  ) {}

  async findAll(): Promise<TrainEntity[]> {
    return await this.trainRep.find({
      join: {
        alias: 'train',
        leftJoinAndSelect: {
          employee: 'train.employees',
          carriage: 'train.carriages',
        },
      },
    });
  }

  async findOneById(id: string): Promise<TrainEntity> {
    return await this.trainRep.findOne({
      where: { id },
      join: {
        alias: 'train',
        leftJoinAndSelect: {
          employee: 'train.employees',
          carriage: 'train.carriages',
        },
      },
    });
  }

  async findSchedule(trainNumber: number): Promise<ITrainRoutes> {
    if (!trainNumber) {
      throw new BadRequestException('train number is required');
    }
    const train = await this.trainRep
      .createQueryBuilder('train')
      .leftJoinAndSelect('train.carriages', 'carriage')
      .leftJoinAndSelect('train.routes', 'route')
      .leftJoinAndSelect('route.stations', 'route_station')
      .leftJoinAndSelect('route_station.station', 'station')
      .where('train.number = :trainNumber', { trainNumber })
      .orderBy('route_station.sequenceIndex')
      .getOne();
    if (!train) {
      throw new BadRequestException('train not found');
    }
    const routes = train.routes.map((route) => {
      return {
        id: route.id,
        name: route.name,
        frequency: route.frequency,
        stations: route.stations.map((routeStation) => {
          return {
            id: routeStation.stationId,
            name: routeStation.station.name,
            code: routeStation.station.code,
            arrivalTime: routeStation.arrivalTime,
            departureTime: routeStation.departureTime,
          };
        }),
      };
    });
    return {
      id: train.id,
      trainType: train.trainType,
      trainNumber: Number(trainNumber),
      carriages: train.carriages.map((carriage) => {
        return {
          id: carriage.id,
          number: carriage.number,
          carriageType: carriage.carriageType,
        };
      }),
      routes,
    };
  }

  async findOneWithoutRelations(id: string): Promise<TrainEntity> {
    return await this.trainRep.findOneBy({ id });
  }

  async create(dto: CreateTrainDto): Promise<TrainEntity> {
    const { employees, ...rest } = dto;
    const allowed = ['DRIVER', 'HEAD', 'DRIVERASSISTANT'];
    const employeeEntities = employees.length
      ? await this.employeesService.findNeededEmployees(allowed, employees)
      : [];
    return await this.trainRep.save({
      employees: [...employeeEntities],
      ...rest,
    });
  }

  async delete(id: string): Promise<TrainEntity> {
    const train = await this.trainRep.findOneBy({ id });
    if (!train) {
      throw new BadRequestException('Train not found');
    }
    await this.trainRep.delete({ id: train.id });
    return train;
  }

  async update(id: string, dto: UpdateTrainDto): Promise<TrainEntity> {
    const { employees, ...rest } = dto;
    const allowed = ['DRIVER', 'HEAD', 'DRIVERASSISTANT'];
    const trainEntity = await this.findOneById(id);
    if (!trainEntity) {
      throw new BadRequestException("can't find train by givven id");
    }
    if (employees) {
      const employeeEntities = await this.employeesService.findNeededEmployees(
        allowed,
        employees,
      );
      trainEntity.employees = [...employeeEntities];
    }
    Object.keys(rest).forEach((key) => {
      if (trainEntity[key]) {
        trainEntity[key] = rest[key];
      } else {
        throw new BadRequestException(`Unexpected field [${key}]`);
      }
    });
    await this.trainRep.save(trainEntity);
    return trainEntity;
  }
}
