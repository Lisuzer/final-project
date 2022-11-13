import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Frequency } from "../schemas/frequency.enum";
import { StationElementDto } from "./create-route-station.dto";


export class CreateRouteDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    train: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: () => [StationElementDto] })
    @ValidateNested({ each: true })
    @Type(() => StationElementDto)
    stations: StationElementDto[];

    @ApiProperty({ enum: Frequency })
    @IsEnum(Frequency, { each: true })
    frequency: Frequency[];
}