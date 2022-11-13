import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './schemas/user-role.enum';
import { UserEntity } from './schemas/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRep: Repository<UserEntity>
    ) { }

    async saveUser(dto: CreateUserDto): Promise<UserEntity> {
        return await this.userRep.save(dto);
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRep.find({ relations: ['employee'] });
    }

    async findOneById(id: string): Promise<UserEntity> {
        return await this.userRep.findOne({
            where: { id },
            select: [
                'id',
                'email',
                'role',
                'employee',
                'password',
            ],
            relations: ['employee'],
        });
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userRep.findOne(
            {
                where: { email },
                select: [
                    'id',
                    'email',
                    'role',
                    'employee',
                    'password',
                ],
                relations: ['employee'],
            });
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
        await this.userRep.update(id, dto);
        return await this.userRep.findOne({ where: { id } });

    }

    async changeRole(id: string, role: UserRole): Promise<UserEntity> {
        const user = await this.findOneById(id);
        user.role = role;
        this.userRep.update(id, user);
        return user;
    }
}
