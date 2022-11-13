import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserRole } from "../schemas/user-role.enum";


export class UpdateUserDto {
    @ApiProperty({
        required: false,
        default: "random@exemple.com"
    })
    @IsString()
    email?: string;

    @ApiProperty({
        required: false,
        default: UserRole.PASSENGER
    })
    role?: UserRole;

    @ApiProperty({
        required: false,
        default: "password"
    })
    @IsString()
    password?: string
}