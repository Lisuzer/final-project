import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../user/schemas/user-role.enum';

export class ChangeUserRoleDto {
  @ApiProperty({
    required: false,
    default: UserRole.PASSENGER,
  })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
