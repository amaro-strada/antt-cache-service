import { CreateAnttCacheDto } from 'dto/request/create-antt-cache.dto';
import { UpdateAnttCacheDto } from 'dto/request/update-antt-cache.dto';
import { IAnttCache } from 'interface/anttCache.interface';
import { Model } from 'mongoose';
export declare class AnttCacheService {
    private anttCacheModel;
    constructor(anttCacheModel: Model<IAnttCache>);
    createOrUpdateAnttCache(createAnttCacheDto: CreateAnttCacheDto): Promise<IAnttCache>;
    updateAnttCache(updateAnttCacheDto: UpdateAnttCacheDto, anttCacheId: string): Promise<IAnttCache>;
    getAllAnttCache(): Promise<IAnttCache[]>;
    getAnttCache(anttCacheId: string): Promise<IAnttCache>;
    getAnttCacheByFields(licensePlate?: string, carrierTaxId?: string, carrierRntrc?: string): Promise<IAnttCache[]>;
    deleteAnttCache(anttCacheId: string): Promise<IAnttCache>;
}
