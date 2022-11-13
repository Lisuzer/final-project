import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class StationElementDto {
    @ApiProperty()
    @IsString()
    stationId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    arrival_time: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    departure_time: string;
}