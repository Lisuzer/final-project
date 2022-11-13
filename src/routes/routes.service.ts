import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteEntity } from './schemas/route.entity';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(RouteEntity)
        private readonly routeRep: Repository<RouteEntity>
    ) { }

    async findAll() {
        return await this.routeRep.find({
            join: {
                alias: 'route',
                leftJoinAndSelect: {
                    station: 'route.stations'
                }
            }
        });
    }

    async findOneById(id: string) {
        return await this.routeRep.findOne({
            where: { id },
            join: {
                alias: 'route',
                leftJoinAndSelect: {
                    station: 'route.stations'
                }
            }
        });
    }
}
