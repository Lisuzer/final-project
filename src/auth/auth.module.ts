import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/schemas/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/role.guard';
import { EmployeesService } from '../employees/employees.service';
import { EmployeeEntity } from '../employees/schemas/employee.entity';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    UsersModule,
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
  providers: [AuthService, JwtStrategy, RolesGuard, EmployeesService],
  exports: [AuthService],
})
export class AuthModule {}
