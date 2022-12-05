import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { TicketDto } from './ticket.dto';

export class BookTicketDto {
  @ApiProperty({
    type: () => [TicketDto],
    required: true,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  tickets: TicketDto[];
}
