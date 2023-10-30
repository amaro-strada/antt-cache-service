"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnttCacheService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../constants");
config_1.ConfigModule.forRoot();
let AnttCacheService = class AnttCacheService {
    constructor(anttCacheModel) {
        this.anttCacheModel = anttCacheModel;
    }
    async createOrUpdateAnttCache(createAnttCacheDto) {
        const { licensePlate, protocol } = createAnttCacheDto;
        createAnttCacheDto.updatedAt = new Date();
        const existingAnttCacheProtocol = await this.anttCacheModel.findOne({
            protocol,
        });
        if (existingAnttCacheProtocol)
            return existingAnttCacheProtocol;
        const existingAnttCache = await this.anttCacheModel.findOne({
            licensePlate,
        });
        if (existingAnttCache)
            return this.updateAnttCache(createAnttCacheDto, existingAnttCache._id);
        createAnttCacheDto.createdAt = new Date();
        const createdAnttCache = await new this.anttCacheModel(createAnttCacheDto);
        return createdAnttCache.save();
    }
    async updateAnttCache(updateAnttCacheDto, anttCacheId) {
        const existingAnttCache = await this.anttCacheModel.findByIdAndUpdate(anttCacheId, updateAnttCacheDto, { new: true });
        if (!existingAnttCache) {
            throw new common_1.NotFoundException(`${constants_1.ANTT_CACHE_RECORD_NOT_FOUND_ID}${anttCacheId}`);
        }
        return existingAnttCache;
    }
    async getAllAnttCache() {
        const anttCacheData = await this.anttCacheModel.find();
        if (!anttCacheData || anttCacheData.length == 0) {
            throw new common_1.NotFoundException(constants_1.ANTT_CACHE_EMPTY);
        }
        return anttCacheData;
    }
    async getAnttCache(anttCacheId) {
        const existingAnttCache = await this.anttCacheModel
            .findById(anttCacheId)
            .exec();
        if (!existingAnttCache) {
            throw new common_1.NotFoundException(`${constants_1.ANTT_CACHE_RECORD_NOT_FOUND_ID}${anttCacheId}`);
        }
        return existingAnttCache;
    }
    async getAnttCacheByFields(licensePlate, carrierTaxId, carrierRntrc) {
        const existingAnttCache = await this.anttCacheModel.find({
            ...(licensePlate ? { licensePlate } : {}),
            ...(carrierTaxId ? { carrierTaxId } : {}),
            ...(carrierRntrc ? { carrierRntrc } : {}),
        });
        if (!existingAnttCache || existingAnttCache.length == 0) {
            throw new common_1.NotFoundException(`${constants_1.ANTT_CACHE_RECORD_NOT_FOUND_PARAMETERS} License Plate = ${licensePlate}, Carrier TaxId = ${carrierTaxId}, Carrier RNTRC = ${carrierRntrc}.`);
        }
        return existingAnttCache;
    }
    async deleteAnttCache(anttCacheId) {
        const deletedAnttCache = await this.anttCacheModel.findByIdAndDelete(anttCacheId);
        if (!deletedAnttCache) {
            throw new common_1.NotFoundException(`${constants_1.ANTT_CACHE_RECORD_NOT_FOUND_ID}${anttCacheId}`);
        }
        return deletedAnttCache;
    }
};
exports.AnttCacheService = AnttCacheService;
exports.AnttCacheService = AnttCacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(process.env.DB_DATABASE)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnttCacheService);
//# sourceMappingURL=antt-cache.service.js.map