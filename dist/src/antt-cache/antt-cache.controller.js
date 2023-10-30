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
exports.AnttCacheController = void 0;
const common_1 = require("@nestjs/common");
const antt_cache_service_1 = require("./antt-cache.service");
const create_antt_cache_dto_1 = require("../../dto/request/create-antt-cache.dto");
const constants_1 = require("../constants");
const passport_1 = require("@nestjs/passport");
let AnttCacheController = class AnttCacheController {
    constructor(anttCacheService) {
        this.anttCacheService = anttCacheService;
    }
    async createOrUpdateAnttCache(response, createAnttCacheDto) {
        try {
            const anttCache = createAnttCacheDto;
            anttCache.createdAt = new Date();
            anttCache.updatedAt = new Date();
            const createdAnttCache = await this.anttCacheService.createOrUpdateAnttCache(createAnttCacheDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: constants_1.ANTT_CACHE_RECORD_CREATED_OR_UPDATED,
                createdAnttCache,
            });
        }
        catch (err) {
            console.log(err);
            let errorMessage = 'Internal Error';
            if (err.code === 11000)
                errorMessage = constants_1.VIOLATION_UNIQUE_KEY_ERROR;
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: constants_1.ANTT_CACHE_RECORD_NOT_CREATED,
                error: errorMessage,
            });
        }
    }
    async getAnttCaches(response, licensePlate, carrierTaxId, carrierRntrc) {
        try {
            const anttCacheData = licensePlate || carrierTaxId || carrierRntrc
                ? await this.anttCacheService.getAnttCacheByFields(licensePlate, carrierTaxId, carrierRntrc)
                : await this.anttCacheService.getAllAnttCache();
            return response.status(common_1.HttpStatus.OK).json(anttCacheData);
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getAnttCache(response, anttCacheId) {
        try {
            const existingAnttCache = await this.anttCacheService.getAnttCache(anttCacheId);
            return response.status(common_1.HttpStatus.OK).json(existingAnttCache);
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteAnttCache(response, anttCacheId) {
        try {
            const deletedAnttCache = await this.anttCacheService.deleteAnttCache(anttCacheId);
            return response.status(common_1.HttpStatus.OK).json({
                message: constants_1.ANTT_CACHE_RECORD_DELETED,
                deletedAnttCache,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
exports.AnttCacheController = AnttCacheController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('api-key')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_antt_cache_dto_1.CreateAnttCacheDto]),
    __metadata("design:returntype", Promise)
], AnttCacheController.prototype, "createOrUpdateAnttCache", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('api-key')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('licensePlate')),
    __param(2, (0, common_1.Query)('carrierTaxId')),
    __param(3, (0, common_1.Query)('carrierRntrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AnttCacheController.prototype, "getAnttCaches", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('api-key')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AnttCacheController.prototype, "getAnttCache", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('api-key')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AnttCacheController.prototype, "deleteAnttCache", null);
exports.AnttCacheController = AnttCacheController = __decorate([
    (0, common_1.Controller)('antt-cache'),
    __metadata("design:paramtypes", [antt_cache_service_1.AnttCacheService])
], AnttCacheController);
//# sourceMappingURL=antt-cache.controller.js.map