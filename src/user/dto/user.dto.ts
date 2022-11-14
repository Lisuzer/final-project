import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @ApiProperty({
        required: true,
        default: "random@exemple.com"
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        required: true,
        default: "password"
    })
    @IsNotEmpty()
    @IsString()
    password: string
}