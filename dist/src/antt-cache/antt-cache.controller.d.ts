import { AnttCacheService } from "./antt-cache.service";
import { CreateAnttCacheDto } from "dto/request/create-antt-cache.dto";
export declare class AnttCacheController {
    private readonly anttCacheService;
    constructor(anttCacheService: AnttCacheService);
    createOrUpdateAnttCache(response: any, createAnttCacheDto: CreateAnttCacheDto): Promise<any>;
    getAnttCaches(response: any, licensePlate?: any, carrierTaxId?: any, carrierRntrc?: any): Promise<any>;
    getAnttCache(response: any, anttCacheId: string): Promise<any>;
    deleteAnttCache(response: any, anttCacheId: string): Promise<any>;
}
