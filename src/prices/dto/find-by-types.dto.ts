import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CarriageType } from '../../carriages/schemas/carriage-type.enum';
import { TrainType } from '../../trains/schemas/train-type.enum';

export class FindByTypesDto {
  @ApiProperty({
    enum: TrainType,
    default: TrainType.PASSENGER,
  })
  @IsEnum(TrainType)
  @IsNotEmpty()
  trainType: TrainType;

  @ApiProperty({
    enum: CarriageType,
    default: CarriageType.BERTH,
  })
  @IsEnum(CarriageType)
  @IsNotEmpty()
  carriageType: CarriageType;
}
