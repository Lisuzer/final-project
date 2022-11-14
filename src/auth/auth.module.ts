import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/employees/schemas/employee.entity';
import { UserEntity } from 'src/user/schemas/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';
import { EmployeesService } from 'src/employees/employees.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/role.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, EmployeeEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '3600s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, EmployeesService, JwtStrategy, RolesGuard],
  exports: [AuthService]
})
export class AuthModule { }
