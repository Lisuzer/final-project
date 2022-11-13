import { EmployeeEntity } from "src/employees/schemas/employee.entity";
import { TrainEntity } from "src/trains/schemas/train.entity";
import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarriageType } from "./carriage-type.enum";


@Entity('carriage')
export class CarriageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    number: number;

    @Column()
    seatCapacity: number;

    @Column({ type: 'enum', enum: CarriageType })
    carriageType: CarriageType;

    @ManyToOne(() => TrainEntity, (train) => train.carriages)
    train: TrainEntity;

    @ManyToMany(() => EmployeeEntity)
    @JoinTable()
    employees: EmployeeEntity[];

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