import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class UpdateEmployeeDto {
    @ApiProperty({
        required: false,
        default: "Mike"
    })
    @IsString()
    name?: string;

    @ApiProperty({
        required: false,
        default: "Sirko"
    })
    @IsString()
    surname?: string;

    @ApiProperty({
        required: false,
        default: "380660781685"
    })
    @IsString()
    contactNumber?: string;

    @ApiProperty({
        required: false,
        default: ""
    })
    @IsDate()
    birthday?: Date;

    @ApiProperty({
        required: false,
        default: "plitkova st."
    })
    @IsString()
    adress?: string;

    @ApiProperty({
        required: false,
        default: "DRIVER"
    })
    @IsString()
    post?: string;

    @ApiProperty({
        required: false,
        default: ""
    })
    @IsString()
    photoUrl?: string;

    @ApiProperty({
        required: false,
        default: ""
    })
    @IsDate()
    careerStart?: Date;

    @ApiProperty({
        required: false,
        default: ""
    })
    @IsDate()
    careerEnd?: Date;

    @ApiProperty({
        required: false,
        default: ""
    })
    @IsString()
    userId?: string;
}