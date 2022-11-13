import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Frequency } from '../schemas/frequency.enum';
import { RouteStationDto } from "./route-station.dto";

export class RouteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(Frequency, { each: true })
    freaquency: Frequency[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    train: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty({ each: true })
    stations: RouteStationDto[];
}