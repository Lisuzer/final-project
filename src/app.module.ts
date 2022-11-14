import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarriagesModule } from './carriages/carriages.module';
import { EmployeesModule } from './employees/employees.module';
import { PricesModule } from './prices/prices.module';
import { RoutesModule } from './routes/routes.module';
import { SchedulesModule } from './schedules/schedules.module';
import { StationsModule } from './stations/stations.module';
import { TicketsModule } from './tickets/tickets.module';
import { TrainsModule } from './trains/trains.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASS'),
        database: configService.get('POSTGRES_DB'),
        entities: [path.join(__dirname, '**', '*.entity.{ts}')],
        synchronize: true,
      }),
    }),
    CarriagesModule,
    EmployeesModule,
    PricesModule,
    RoutesModule,
    SchedulesModule,
    StationsModule,
    TicketsModule,
    TrainsModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
