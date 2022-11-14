import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeesService } from 'src/employees/employees.service';
import { Repository } from 'typeorm';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainEntity } from './schemas/train.entity';

@Injectable()
export class TrainsService {
    constructor(
        @InjectRepository(TrainEntity)
        private readonly trainRep: Repository<TrainEntity>,
        @Inject()
        private readonly employeesService: EmployeesService
    ) { }

    async findAll(): Promise<TrainEntity[]> {
        return await this.trainRep.find({
            join: {
                alias: 'train',
                leftJoinAndSelect: {
                    employee: 'train.employees',
                    carriage: 'train.carriages',
                }
            }
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

    async create(dto: CreateTrainDto): Promise<TrainEntity> {
        const { employees, ...rest } = dto;
        const allowed = ['driver', 'head', 'driverAssistant'];
        const employeeEntities = employees.length ? await this.employeesService.findNeededEmployees(allowed, employees) : [];
        return await this.trainRep.save({ employees: [...employeeEntities], ...rest });
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
        const allowed = ['driver', 'head', 'driverAssistant'];
        const trainEntity = await this.findOneById(id);
        if (!trainEntity) {
            throw new BadRequestException("can't find train by givven id");
        }
        if (employees) {
            const employeeEntities = await this.employeesService.findNeededEmployees(allowed, employees);
            trainEntity.employees = [...employeeEntities];
        }
        Object.keys(rest).forEach((key) => {
            if (trainEntity[key]) {
                trainEntity[key] = rest[key];
            } else {
                throw new BadRequestException(`Unexpected field [${key}]`);
            }
        });
        await this.trainRep.update(trainEntity.id, trainEntity);
        return trainEntity;
    }
}
