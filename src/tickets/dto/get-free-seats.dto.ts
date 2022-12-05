import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class GetFreeSeatsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  trainNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  routeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
