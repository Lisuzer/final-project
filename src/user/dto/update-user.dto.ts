import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    default: 'random@exemple.com',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    required: false,
    default: 'password',
  })
  @IsString()
  @IsOptional()
  password?: string;
}
