import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdatePriceDto {
  @ApiProperty({
    required: true,
    default: 630,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  value: number;
}
