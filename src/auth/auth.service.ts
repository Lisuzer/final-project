import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { LoginUserDto } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { UserEntity } from '../user/schemas/user.entity';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async validateUser(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const user = await this.usersService.findByEmailForAuth(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async register(dto: RegisterUserDto): Promise<IToken> {
    const { password, ...rest } = dto;
    const existUser = await this.usersService.findByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException('User with this email already exist');
    }
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.create({
      ...rest,
      password: hashedPassword,
    });
    const { password: _, ...result } = user;
    const accessToken = await this.jwtService.signAsync({ user: result });
    return { accessToken };
  }

  async login(dto: LoginUserDto): Promise<IToken> {
    const user = await this.validateUser(dto);
    if (user) {
      if (!user.active) {
        throw new BadRequestException('This user was banned');
      }
    }
    const { password: _, ...result } = user;
    const accessToken = await this.jwtService.signAsync({ user: result });
    return { accessToken };
  }

  async changeUserRole(dto: ChangeUserRoleDto): Promise<UserEntity> {
    return await this.usersService.changeRole(dto.userId, dto.role);
  }

  async getUser({ user }: any): Promise<UserEntity> {
    return user;
  }

  async updateProfile(dto: UpdateUserDto, { user }: any) {
    const { password, email } = dto;
    if (password) {
      dto.password = await this.hashPassword(password);
    }
    if (email) {
      const existUser = await this.usersService.findByEmail(email);
      if (existUser) {
        throw new BadRequestException('User with this email already exist');
      }
    }
    await this.usersService.update(user.id, dto);
    return await this.usersService.findOneById(user.id);
  }
}
