import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TrainEntity } from '../../trains/schemas/train.entity';
import { Frequency } from './frequency.enum';
import { RouteStationEntity } from './route-station.entity';

@Entity('route')
export class RouteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: Frequency,
    array: true,
    default: [Frequency.DAILY],
  })
  frequency: Frequency[];

  @ManyToOne(() => TrainEntity, (train) => train.routes, { eager: true })
  train: TrainEntity;

  @OneToMany(() => RouteStationEntity, (stations) => stations.route, {
    eager: true,
  })
  stations: RouteStationEntity[];

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
