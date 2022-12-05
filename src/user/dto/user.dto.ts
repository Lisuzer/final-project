import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: true,
    default: 'random@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    default: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
