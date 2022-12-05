import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { CarriageType } from '../schemas/carriage-type.enum';

export class UpdateCarriageDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  number?: number;

  @ApiProperty({ enum: CarriageType })
  @IsOptional()
  @IsEnum(CarriageType)
  carriageType?: CarriageType;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  employees?: string[];
}
