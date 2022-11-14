import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

export class ChangeUserRoleDto extends PickType(UpdateUserDto, ['role']) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;
}