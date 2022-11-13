import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { CarriageType } from '../schemas/carriage-type.enum';

export class CarriageDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    number: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    train: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    seatCapacity: number;

    @ApiProperty({ enum: CarriageType })
    @IsNotEmpty()
    @IsEnum(CarriageType)
    carriageType: CarriageType;

    @ApiProperty()
    @IsArray({ each: true })
    @IsOptional()
    employees?: string[];
}