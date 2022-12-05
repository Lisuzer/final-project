import { Module } from '@nestjs/common';
import { CarriagesModule } from './carriages/carriages.module';
import { EmployeesModule } from './employees/employees.module';
import { PricesModule } from './prices/prices.module';
import { RoutesModule } from './routes/routes.module';
import { SchedulesModule } from './schedules/schedules.module';
import { StationsModule } from './stations/stations.module';
import { TicketsModule } from './tickets/tickets.module';
import { TrainsModule } from './trains/trains.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/schemas/user.entity';
import { EmployeeEntity } from './employees/schemas/employee.entity';
import { TrainEntity } from './trains/schemas/train.entity';
import { CarriageEntity } from './carriages/schemas/carriage.entity';
import { RouteEntity } from './routes/schemas/route.entity';
import { StationEntity } from './stations/schemas/station.entity';
import { PriceEntity } from './prices/schemas/price.entity';
import { TicketEntity } from './tickets/schemas/ticket.entity';
import { RouteStationEntity } from './routes/schemas/route-station.entity';

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
        //entities: [path.join(__dirname, '**', '*.entity.{ts}')],
        entities: [
          UserEntity,
          EmployeeEntity,
          TrainEntity,
          CarriageEntity,
          RouteEntity,
          StationEntity,
          TicketEntity,
          PriceEntity,
          RouteStationEntity,
        ],
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
    UsersModule,
  ],
})
export class AppModule {}
