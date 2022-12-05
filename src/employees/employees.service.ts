import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './schemas/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRep: Repository<EmployeeEntity>,
  ) {}

  async findAll(): Promise<EmployeeEntity[]> {
    return await this.employeeRep.find();
  }

  async findOneById(id: string): Promise<EmployeeEntity> {
    return await this.employeeRep.findOneBy({ id });
  }

  async findManyByIds(ids: string[]): Promise<EmployeeEntity[]> {
    return await this.employeeRep.findBy({ id: In(ids) });
  }

  async create(dto: CreateEmployeeDto): Promise<EmployeeEntity> {
    try {
      return await this.employeeRep.save(dto);
    } catch (e) {
      return e;
    }
  }

  async update(id: string, dto: UpdateEmployeeDto): Promise<EmployeeEntity> {
    const employee = await this.employeeRep.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('No employee found');
    }
    await this.employeeRep.update(employee.id, dto);
    return await this.employeeRep.findOneBy({ id });
  }

  async delete(id: string): Promise<EmployeeEntity> {
    const employee = await this.employeeRep.findOneBy({ id });
    if (!employee) {
      throw new BadRequestException('Employee not found');
    }
    try {
      await this.employeeRep.delete({ id: employee.id });
    } catch (e) {
      return e;
    }
    return employee;
  }

  async findNeededEmployees(
    allowed: string[],
    employees: string[],
  ): Promise<EmployeeEntity[]> {
    const employeeEntities = await this.findManyByIds(employees);
    if (employees.length > employeeEntities.length) {
      throw new BadRequestException("can't find all employees by givven ids");
    }
    employeeEntities.forEach((employee) => {
      if (!allowed.includes(employee.post)) {
        throw new BadRequestException(
          `employee with id:${employee.id} haven't needed post`,
        );
      }
    });
    return employeeEntities;
  }
}
