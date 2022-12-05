import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetScheduleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stationName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: string;
}
