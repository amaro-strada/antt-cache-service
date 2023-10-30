import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateAnttCacheDto {
    @IsOptional()
    readonly id: string;

    @IsOptional()
    public createdAt: Date;

    @IsOptional()
    public updatedAt: Date;

    @IsString()
    @IsNotEmpty()
    readonly carrierName: string;

    @IsNumberString()
    @IsNotEmpty()
    readonly carrierTaxId: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly activeRntrc: boolean;

    @IsNumberString()
    @IsNotEmpty()
    readonly carrierRntrc: string;

    @IsString()
    @IsNotEmpty()
    readonly licensePlate: string;

    @IsString()
    @IsOptional()
    readonly message: string;

    @IsString()
    @IsNotEmpty()
    readonly protocol: string;
}