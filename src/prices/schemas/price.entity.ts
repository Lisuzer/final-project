import { CarriageType } from '../../carriages/schemas/carriage-type.enum';
import { TrainType } from '../../trains/schemas/train-type.enum';
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('price')
export class PriceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float4' })
  value: number;

  @Column({ type: 'enum', enum: TrainType })
  trainType: TrainType;

  @Column({ type: 'enum', enum: CarriageType })
  carriageType: CarriageType;

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
