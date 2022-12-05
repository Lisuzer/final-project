import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { TrainType } from '../schemas/train-type.enum';

export class TrainDto {
  @ApiProperty({
    required: true,
    type: Number,
    default: 1,
    description: 'Train number',
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  number: number;

  @ApiProperty({
    required: true,
    enum: TrainType,
    default: TrainType.PASSENGER,
    description: 'Train type',
  })
  @IsEnum(TrainType)
  @IsNotEmpty()
  trainType: TrainType;

  @ApiProperty({
    required: false,
    default: [],
    description: 'Train employees',
  })
  @IsArray()
  @IsOptional()
  employees?: string[];
}
