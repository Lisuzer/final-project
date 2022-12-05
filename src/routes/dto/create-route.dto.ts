import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Frequency } from '../schemas/frequency.enum';
import { StationElementDto } from './create-route-station.dto';

export class CreateRouteDto {
  @ApiProperty({
    required: true,
    description: 'Train id',
  })
  @IsString()
  @IsNotEmpty()
  train: string;

  @ApiProperty({
    required: true,
    default: 'Rotan',
    description: 'Route name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: () => [StationElementDto],
  })
  @ValidateNested({ each: true })
  @Type(() => StationElementDto)
  @IsNotEmpty({ each: true })
  stations: StationElementDto[];

  @ApiProperty({
    required: true,
    enum: Frequency,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  frequency: Frequency[];
}
