import { BadRequestException, Injectable } from '@nestjs/common';
import { RoutesService } from '../routes/routes.service';
import { Frequency } from '../routes/schemas/frequency.enum';
import { StationsService } from '../stations/stations.service';
import { GetScheduleDto } from './dto/get-schedule.dto';
import { ISchedule } from './interfaces/schedule.interface';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly routeService: RoutesService,
    private readonly stationService: StationsService,
  ) {}

  async findOne(dto: GetScheduleDto): Promise<ISchedule> {
    const { stationName, date } = dto;
    let corrDate: Date;
    const station = await this.stationService.find(stationName);
    if (!station[0]) {
      throw new BadRequestException('Invalid station name');
    }
    if (!date) {
      if (
        !date &&
        new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
      ) {
        throw new BadRequestException('Invalid date');
      } else {
        corrDate = new Date();
      }
    } else {
      corrDate = new Date(date);
    }

    const routes = await this.routeService.getRoutesForShedule(stationName);
    const filteredRoutes = routes.filter((route) => {
      if (route.frequency instanceof Array) {
        return route.frequency.some((freq) =>
          this.resolveFrequency(freq, corrDate),
        );
      } else {
        return this.resolveFrequency(route.frequency, corrDate);
      }
    });

    const payload = [];
    filteredRoutes.forEach((route) => {
      payload.push({
        routeId: route.id,
        routeName: route.name,
        frequency: route.frequency,
        arrivalTime: route.stations[0].arrivalTime,
        departureTime: route.stations[0].departureTime,
      });
    });

    return {
      date: corrDate.toISOString().split('T')[0],
      station: {
        id: station[0].id,
        name: station[0].name,
        code: station[0].code,
      },
      routes: payload,
    };
  }

  private resolveFrequency(freq: Frequency, date: Date): boolean {
    if (freq == Frequency.DAILY) return true;
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    switch (freq) {
      case Frequency.EVENDAY:
        return dayOfMonth % 2 == 0;
      case Frequency.ODDDAY:
        return dayOfMonth % 2 == 1;
      case Frequency.MONDAY:
        return dayOfWeek == 1;
      case Frequency.TUESDAY:
        return dayOfWeek == 2;
      case Frequency.WEDNESDAY:
        return dayOfWeek == 3;
      case Frequency.THURSDAY:
        return dayOfWeek == 4;
      case Frequency.FRIDAY:
        return dayOfWeek == 5;
      case Frequency.SATURDAY:
        return dayOfWeek == 6;
      case Frequency.SUNDAY:
        return dayOfWeek == 0;
    }
  }
}
