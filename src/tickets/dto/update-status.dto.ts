import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketStatus } from '../schemas/ticket-status.enum';

export class UpdateStatusDto {
  @ApiProperty({
    enum: TicketStatus,
    description: 'Ticket status',
    required: true,
  })
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status: TicketStatus;
}
