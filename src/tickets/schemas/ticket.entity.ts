import { CarriageEntity } from "src/carriages/schemas/carriage.entity";
import { PriceEntity } from "src/prices/schemas/price.entity";
import { RouteEntity } from "src/routes/schemas/route.entity";
import { StationEntity } from "src/stations/schemas/station.entity";
import { TrainEntity } from "src/trains/schemas/train.entity";
import { UserEntity } from "src/user/schemas/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IdDocumentType } from "./id-doc.enum";
import { TicketStatus } from "./ticket-status.enum";

@Entity('ticket')
export class TicketEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    passengerName: string;

    @Column()
    passengerSurname: string;

    @Column()
    passengerPatronymic: string;

    @Column({ type: 'enum', enum: IdDocumentType })
    documentType: IdDocumentType;

    @Column()
    idCard: string;

    @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.BOUGHT })
    status: TicketStatus;

    @Column({ type: 'date' })
    departureDate: Date;

    @ManyToOne(() => TrainEntity)
    train: TrainEntity;

    @ManyToOne(() => CarriageEntity, { eager: true })
    carriage: CarriageEntity;

    @Column()
    seatNumber: number;

    @ManyToOne(() => StationEntity, { eager: true })
    departureStation: StationEntity;

    @ManyToOne(() => StationEntity, { eager: true })
    arrivalStation: StationEntity;

    @ManyToOne(() => UserEntity, { nullable: true })
    user: UserEntity;

    @ManyToOne(() => RouteEntity)
    route: RouteEntity;

    @ManyToOne(() => PriceEntity)
    price: PriceEntity;

    @Column({ type: 'float4' })
    totalPrice: number;

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