import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeesService } from 'src/employees/employees.service';
import { TrainsService } from 'src/trains/trains.service';
import { Repository } from 'typeorm';
import { CreateCarriageDto } from './dto/create-carriage.dto';
import { UpdateCarriageDto } from './dto/update-carriage.dto';
import { CarriageEntity } from './schemas/carriage.entity';

@Injectable()
export class CarriagesService {
    constructor(
        @InjectRepository(CarriageEntity)
        private readonly carriageRep: Repository<CarriageEntity>,
        private readonly trainService: TrainsService,
        private readonly employeesService: EmployeesService
    ) { }

    async findAll(): Promise<CarriageEntity[]> {
        return await this.carriageRep.find();
    }

    async findOneById(id: string): Promise<CarriageEntity> {
        return await this.carriageRep.findOneBy({ id });
    }

    async create(dto: CreateCarriageDto): Promise<CarriageEntity> {
        const { train, employees, number, ...rest } = dto;
        const allowed = ['conductor'];

        const trainEntity = await this.trainService.findOneById(train);
        if (!trainEntity) {
            throw new BadRequestException('Train not found');
        }
        trainEntity.carriages.forEach((carriage) => {
            if (carriage.number == number) {
                throw new BadRequestException('Number can`t overlap existing ones');
            }
        });

        const employeeEntities = employees.length ? await this.employeesService.findNeededEmployees(allowed, employees) : [];

        return await this.carriageRep.save({ train: trainEntity, employees: [...employeeEntities], number, ...rest });
    }

    async update(id: string, dto: UpdateCarriageDto): Promise<CarriageEntity> {
        const { number, employeesIds, ...rest } = dto;
        const allowed = ['conductor'];

        const carriage = await this.findOneById(id);
        if (!carriage) {
            throw new BadRequestException('carriage not found');
        }
        if (number) {
            const trainEntity = await this.trainService.findOneById(carriage.train.id);
            if (!trainEntity) {
                throw new BadRequestException('train not found');
            }
            trainEntity.carriages.forEach((carriage) => {
                if (carriage.number == number) {
                    throw new BadRequestException('number is already in use');
                }
            });
            carriage.number = number;
        }
        if (employeesIds.length) {
            carriage.employees = await this.employeesService.findNeededEmployees(allowed, employeesIds);
        }
        Object.keys(rest).forEach((key) => {
            if (carriage[key]) {
                carriage[key] = rest[key];
            } else {
                throw new BadRequestException(`Unexpected field [${key}]`);
            }
        });
        await this.carriageRep.update(carriage.id, carriage);
        return carriage;
    }

    async delete(id: string) {
        const carriage = await this.findOneById(id);
        if (!carriage) {
            throw new BadRequestException("carriage not found");
        }
        await this.carriageRep.delete(carriage.id);
        return carriage;
    }
}
