import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { CreateAnttCacheDto } from "dto/request/create-antt-cache.dto";
import { UpdateAnttCacheDto } from "dto/request/update-antt-cache.dto";
import { IAnttCache } from "interface/anttCache.interface";
import { Model } from "mongoose";
import {
  ANTT_CACHE_EMPTY,
  ANTT_CACHE_RECORD_NOT_FOUND_ID,
  ANTT_CACHE_RECORD_NOT_FOUND_PARAMETERS,
} from "src/constants";

ConfigModule.forRoot();

@Injectable()
export class AnttCacheService {
  constructor(
    @InjectModel(process.env.DB_DATABASE)
    private anttCacheModel: Model<IAnttCache>
  ) {}

  /**
   * creates or updates an ANTT validation response cache
   * @param createAnttCacheDto
   * @returns IAnttCache
   */
  async createOrUpdateAnttCache(
    createAnttCacheDto: CreateAnttCacheDto
  ): Promise<IAnttCache> {
    const { carrierTaxId, carrierRntrc, licensePlate, protocol } =
      createAnttCacheDto;

    createAnttCacheDto.updatedAt = new Date();

    const existingAnttCache = await this.anttCacheModel.findOne({
      carrierTaxId,
      carrierRntrc,
      licensePlate,
    });

    if (existingAnttCache)
      return this.updateAnttCache(createAnttCacheDto, existingAnttCache._id);

    const existingAnttCacheProtocol = await this.anttCacheModel.findOne({
      protocol,
    });

    if (existingAnttCacheProtocol) return existingAnttCacheProtocol;

    createAnttCacheDto.createdAt = new Date();
    const createdAnttCache = await new this.anttCacheModel(createAnttCacheDto);
    return createdAnttCache.save();
  }

  /**
   * updates an existing ANTT validation response cache
   * @param anttCacheId
   * @param updateAnttCacheDto
   * @returns IAnttCache
   */
  async updateAnttCache(
    updateAnttCacheDto: UpdateAnttCacheDto,
    anttCacheId: string
  ): Promise<IAnttCache> {
    const existingAnttCache = await this.anttCacheModel.findByIdAndUpdate(
      anttCacheId,
      updateAnttCacheDto,
      { new: true }
    );
    if (!existingAnttCache) {
      throw new NotFoundException(
        `${ANTT_CACHE_RECORD_NOT_FOUND_ID}${anttCacheId}`
      );
    }
    return existingAnttCache;
  }

  /**
   * gets all ANTT validation response caches
   * @returns IAnttCache[]
   */
  async getAllAnttCache(): Promise<IAnttCache[]> {
    const anttCacheData = await this.anttCacheModel.find();
    if (!anttCacheData || anttCacheData.length == 0) {
      throw new NotFoundException(ANTT_CACHE_EMPTY);
    }
    return anttCacheData;
  }

  /**
   * gets a specific ANTT validation response cache
   * @param anttCacheId
   * @returns IAnttCache
   */
  async getAnttCache(anttCacheId: string): Promise<IAnttCache> {
    const existingAnttCache = await this.anttCacheModel
      .findById(anttCacheId)
      .exec();
    if (!existingAnttCache) {
      throw new NotFoundException(
        `${ANTT_CACHE_RECORD_NOT_FOUND_ID}${anttCacheId}`
      );
    }
    return existingAnttCache;
  }

  /**
   * Finds ANTT Caches based on the specified parameters
   * @param licensePlate
   * @param carrierTaxId
   * @param carrierRntrc
   * @returns IAnttCache[]
   */
  async getAnttCacheByFields(
    licensePlate?: string,
    carrierTaxId?: string,
    carrierRntrc?: string
  ): Promise<IAnttCache[]> {
    const existingAnttCache = await this.anttCacheModel.find({
      ...(licensePlate ? { licensePlate } : {}),
      ...(carrierTaxId ? { carrierTaxId } : {}),
      ...(carrierRntrc ? { carrierRntrc } : {}),
    });

    if (!existingAnttCache || existingAnttCache.length == 0) {
      throw new NotFoundException(
        `${ANTT_CACHE_RECORD_NOT_FOUND_PARAMETERS} License Plate = ${licensePlate}, Carrier TaxId = ${carrierTaxId}, Carrier RNTRC = ${carrierRntrc}.`
      );
    }

    return existingAnttCache;
  }

  /**
   * deletes a specific ANTT validation response cache
   * @param anttCacheId
   * @returns IAnttCache
   */
  async deleteAnttCache(anttCacheId: string): Promise<IAnttCache> {
    const deletedAnttCache =
      await this.anttCacheModel.findByIdAndDelete(anttCacheId);
    if (!deletedAnttCache) {
      throw new NotFoundException(
        `${ANTT_CACHE_RECORD_NOT_FOUND_ID}${anttCacheId}`
      );
    }
    return deletedAnttCache;
  }
}
