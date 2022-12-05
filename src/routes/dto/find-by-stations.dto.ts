import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindByStationsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startStation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  endStation: string;
}
