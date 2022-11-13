import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class EmployeeDto {
    @ApiProperty({
        required: true,
        default: "Mike"
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        default: "Sirko"
    })
    @IsNotEmpty()
    @IsString()
    surname: string;

    @ApiProperty({
        required: true,
        default: "380660781685"
    })
    @IsNotEmpty()
    @IsString()
    contactNumber: string;

    @ApiProperty({
        required: true,
        default: ""
    })
    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @ApiProperty({
        required: true,
        default: "plitkova st."
    })
    @IsNotEmpty()
    @IsString()
    adress: string;

    @ApiProperty({
        required: true,
        default: "DRIVER"
    })
    @IsNotEmpty()
    @IsString()
    post: string;

    @ApiProperty({
        required: true,
        default: ""
    })
    @IsNotEmpty()
    @IsString()
    photoUrl: string;

    @ApiProperty({
        required: true,
        default: ""
    })
    @IsNotEmpty()
    @IsDate()
    careerStart: Date;

    @ApiProperty({
        required: true,
        default: ""
    })
    @IsNotEmpty()
    @IsDate()
    careerEnd: Date;

    @ApiProperty({
        required: true,
        default: ""
    })
    @IsNotEmpty()
    @IsString()
    userId: string;
}