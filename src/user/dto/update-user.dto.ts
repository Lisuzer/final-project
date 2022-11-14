import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { UserRole } from "../schemas/user-role.enum";


export class UpdateUserDto {
    @ApiProperty({
        required: false,
        default: "random@exemple.com"
    })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({
        required: false,
        default: UserRole.PASSENGER
    })
    @IsOptional()
    role?: UserRole;

    @ApiProperty({
        required: false,
        default: "password"
    })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    employeeId?: string;
}