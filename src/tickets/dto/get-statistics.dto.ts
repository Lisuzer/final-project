import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsDateString,
  IsString,
  IsInt,
  IsPositive,
} from 'class-validator';

export class GetStatisticsDto {
  @ApiProperty({
    required: false,
    description: 'Train number',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  trainNumber: number;

  @ApiProperty({
    required: false,
    description: 'Date from which statistics will be calculated',
  })
  @IsOptional()
  @IsDateString()
  from: string;

  @ApiProperty({
    required: false,
    description: 'Date to which statistics will be calculated',
  })
  @IsOptional()
  @IsDateString()
  to: string;
}
