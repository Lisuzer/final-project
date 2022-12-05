import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StationElementDto {
  @ApiProperty({
    description: 'Station id',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({
    description: 'Arrival time',
    default: '10:00',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  arrivalTime: string;

  @ApiProperty({
    description: 'Departure time',
    default: '11:00',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  departureTime: string;
}
