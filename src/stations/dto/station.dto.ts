import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class StationDto {
  @ApiProperty({
    required: true,
    default: 'Bayrak',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    default: 450501,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  code: number;
}
