import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class createParkDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly lat: number;

    @IsNotEmpty()
    @IsNumber()
    readonly long: number;

    @IsNotEmpty()
    @IsNumber()
    readonly maxCap: number;

    @IsNotEmpty()
    @IsNumber()
    currentCap: number;
}