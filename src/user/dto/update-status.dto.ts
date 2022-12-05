import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateUserStatusDto {
  @ApiProperty({
    required: true,
    description: 'New status',
    type: 'boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty({
    required: true,
    description: 'User id',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
