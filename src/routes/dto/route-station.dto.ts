import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";


export class RouteStationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    routeId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    stationId: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    sequencIndex: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    departureTime: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    arrivalTime: string;
}