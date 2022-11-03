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
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CarriagesModule,
    EmployeesModule,
    PricesModule,
    RoutesModule,
    SchedulesModule,
    StationsModule,
    TicketsModule,
    TrainsModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
