import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CarriageType } from 'src/carriages/schemas/carriage-type.enum';
import { TrainType } from 'src/trains/schemas/train-type.enum';

export class PriceDto {
    @ApiProperty({
        required: true,
        default: 520
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    value: number;

    @ApiProperty({
        required: true,
        enum: TrainType,
        default: TrainType.PASSENGER
    })
    @IsEnum(TrainType)
    @IsNotEmpty()
    trainType: TrainType;

    @ApiProperty({
        required: true,
        enum: CarriageType,
        default: CarriageType.COMPARTMENT
    })
    @IsEnum(CarriageType)
    @IsNotEmpty()
    carriageType: CarriageType;
}