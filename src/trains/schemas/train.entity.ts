import { CarriageEntity } from '../../carriages/schemas/carriage.entity';
import { EmployeeEntity } from '../../employees/schemas/employee.entity';
import { RouteEntity } from '../../routes/schemas/route.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainType } from './train-type.enum';

@Entity('train')
export class TrainEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  number: number;

  @Column({ type: 'enum', enum: TrainType })
  trainType: TrainType;

  @OneToMany(() => CarriageEntity, (carriages) => carriages.train)
  carriages: CarriageEntity[];

  @ManyToMany(() => EmployeeEntity, { nullable: true })
  @JoinTable()
  employees: EmployeeEntity[];

  @OneToMany(() => RouteEntity, (routes) => routes.train)
  routes: RouteEntity[];

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
