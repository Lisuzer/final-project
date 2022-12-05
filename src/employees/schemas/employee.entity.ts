import { UserEntity } from 'src/user/schemas/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  contactNumber: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  adress: string;

  @Column()
  post: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ type: 'date' })
  careerStart: Date;

  @Column({ nullable: true, type: 'date' })
  careerEnd: Date;

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
