import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../employees/schemas/employee.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LinkEmployeeAdnUserDto } from './dto/link-employee-and-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './schemas/user-role.enum';
import { UserEntity } from './schemas/user.entity';
import { UpdateUserStatusDto } from './dto/update-status.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly employeeRep: Repository<EmployeeEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRep.find({ relations: ['employee'] });
  }

  async findOneById(id: string): Promise<UserEntity> {
    return await this.userRep.findOne({
      where: { id },
      relations: ['employee'],
    });
  }

  async findByEmailForAuth(email: string): Promise<UserEntity> {
    return await this.userRep.findOne({
      where: { email },
      select: ['id', 'email', 'role', 'employee', 'password', 'active'],
      relations: ['employee'],
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRep.findOne({
      where: { email },
      relations: ['employee'],
    });
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    return await this.userRep.save(dto);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    await this.userRep.update(id, dto);
    return await this.userRep.findOne({ where: { id } });
  }

  async changeRole(id: string, role: UserRole): Promise<UserEntity> {
    const user = await this.findOneById(id);
    user.role = role;
    await this.userRep.update(id, user);
    return user;
  }

  async linkEmployeeAndUser(dto: LinkEmployeeAdnUserDto): Promise<UserEntity> {
    const { userId, employeeId } = dto;
    const [user, employee] = await Promise.all([
      this.findOneById(userId),
      this.employeeRep.findOneBy({ id: employeeId }),
    ]);
    if (!user || !employee) {
      throw new BadRequestException('Invalid credentials');
    }
    user.employee = employee;
    await this.userRep.update(user.id, user);
    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    const user = await this.userRep.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    await this.userRep.delete(id);
    return user;
  }

  async updateStatus(dto: UpdateUserStatusDto): Promise<UserEntity> {
    const { userId, status } = dto;
    const user = await this.userRep.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.active = status;
    await this.userRep.update(user.id, user);
    return user;
  }
}
