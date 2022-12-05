import { StationEntity } from '../../stations/schemas/station.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { RouteEntity } from './route.entity';

@Entity('route_station')
export class RouteStationEntity {
  @PrimaryColumn('uuid')
  stationId: string;

  @ManyToOne(() => StationEntity, { eager: true, onDelete: 'CASCADE' })
  station: StationEntity;

  @PrimaryColumn('uuid')
  routeId: string;

  @ManyToOne(() => RouteEntity, (route) => route.stations, {
    onDelete: 'CASCADE',
  })
  route: RouteEntity;

  @Column()
  sequenceIndex: number;

  @Column()
  departureTime: string;

  @Column()
  arrivalTime: string;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }
}
