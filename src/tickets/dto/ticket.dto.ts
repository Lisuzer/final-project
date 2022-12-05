import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class TicketDto {
  @ApiProperty({
    required: true,
    default: 'Bayrak',
    description: 'Departure station name',
  })
  @IsNotEmpty()
  @IsString()
  departureStation: string;

  @ApiProperty({
    required: true,
    default: 'Velikiy Bug',
    description: 'Arrival station name',
  })
  @IsNotEmpty()
  @IsString()
  arrivalStation: string;

  @ApiProperty({
    required: true,
    description: 'Departure date',
    default: '2022-12-15',
  })
  @IsNotEmpty()
  @IsDateString()
  departureDate: string;

  @ApiProperty({
    required: true,
    default: 'Legkoe',
    description: 'Route name',
  })
  @IsNotEmpty()
  @IsString()
  routeName: string;

  @ApiProperty({
    required: true,
    default: 2,
    description: 'Train number',
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  trainNumber: number;

  @ApiProperty({
    required: true,
    description: 'Seat number',
    default: 1,
  })
  seatNumber: number;

  @ApiProperty({
    required: true,
    default: 2,
    description: 'Carriage number',
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  carriageNumber: number;
}
