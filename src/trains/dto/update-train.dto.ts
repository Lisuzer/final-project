import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { TrainType } from '../schemas/train-type.enum';

export class UpdateTrainDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(TrainType)
  trainType?: TrainType;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  employees?: string[];

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  number?: number;
}
