import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { LinkEmployeeAdnUserDto } from './dto/link-employee-and-user.dto';
import { UserEntity } from 'src/user/schemas/user.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly employeesService: EmployeesService,
        private readonly jwtService: JwtService
    ) { }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async validateUser(dto: LoginUserDto): Promise<any> {
        const { email, password } = dto;
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new BadRequestException('Invalid credentials');
    }

    async register(dto: RegisterUserDto): Promise<any> {
        const user = await this.usersService.create(dto);
        const token = await this.jwtService.signAsync({ user });
        return { token };
    }

    async login(dto: LoginUserDto): Promise<any> {
        const user = await this.validateUser(dto);
        const token = await this.jwtService.signAsync({ user });
        return { token };
    }

    async linkEmployeeAndUser(dto: LinkEmployeeAdnUserDto): Promise<UserEntity> {
        const { userId, employeeId } = dto;
        const [user, employee] = await Promise.all([
            this.usersService.findOneById(userId),
            this.employeesService.findOneById(employeeId)]
        );
        if (!user || !employee) {
            throw new BadRequestException('Invalid credentials');
        }
        user.employee = employee;
        await this.usersService.linkEmployeeAndUser(user.id, employee);
        return user;
    }

    async changeUserRole(dto: ChangeUserRoleDto): Promise<UserEntity> {
        return await this.usersService.changeRole(dto.userId, dto.role);
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.usersService.findAll();
    }

    async getUser(req: any): Promise<UserEntity> {
        return req.user;
    }

    async updateProfile({ user }: any, dto: UpdateUserDto) {
        const { password } = dto;
        if (password) {
            dto.password = await this.hashPassword(password);
        }
        await this.usersService.update(user.id, dto);
        return await this.usersService.findOneById(user.id);
    }
}
