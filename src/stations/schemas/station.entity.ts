import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('station')
export class StationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: number;

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
