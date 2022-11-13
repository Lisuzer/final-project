import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { TrainType } from "../schemas/train-type.enum";


export class TrainDto {
    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    number: number;

    @ApiProperty()
    @IsEnum(TrainType)
    @IsNotEmpty()
    trainType: TrainType;

    @ApiProperty()
    @IsArray({ each: true })
    @IsOptional()
    employees?: string[];
}