import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsArray } from 'class-validator';
import { IdDocumentType } from '../schemas/id-doc.enum';

export class BuyTicketDto {
  @ApiProperty({
    type: () => [ToBuyTicketDto],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  tickets: ToBuyTicketDto[];
}
export class ToBuyTicketDto {
  @ApiProperty({
    required: true,
    description: 'Passenger name',
    default: 'John',
  })
  @IsNotEmpty()
  @IsString()
  passengerName: string;

  @ApiProperty({
    required: true,
    description: 'Passenger surname',
    default: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  passengerSurname: string;

  @ApiProperty({
    required: true,
    description: 'Passenger patronymic',
    default: 'Smith',
  })
  @IsNotEmpty()
  @IsString()
  passengerPatronymic: string;

  @ApiProperty({
    enum: IdDocumentType,
    required: true,
    description: 'Passenger document type',
    default: IdDocumentType.IDCARD,
  })
  @IsNotEmpty()
  @IsEnum(IdDocumentType)
  documentType: IdDocumentType;

  @ApiProperty({
    required: true,
    description: 'Passenger document number',
    default: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  idCard: string;

  @ApiProperty({
    required: true,
    description: 'Ticket id',
  })
  @IsNotEmpty()
  @IsString()
  ticketId: string;
}
