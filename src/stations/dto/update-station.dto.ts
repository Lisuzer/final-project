import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateStationDto {
  @ApiProperty({
    required: false,
    default: 'Bayrak',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    default: 450501,
  })
  @IsNumber()
  @IsPositive()
  code: number;
}
