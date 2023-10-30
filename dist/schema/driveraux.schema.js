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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnttCacheSchema = exports.AnttCache = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let AnttCache = class AnttCache {
};
exports.AnttCache = AnttCache;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], AnttCache.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], AnttCache.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AnttCache.prototype, "carrierName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AnttCache.prototype, "carrierTaxId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], AnttCache.prototype, "activeRntrc", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AnttCache.prototype, "carrierRntrc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], AnttCache.prototype, "licensePlate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AnttCache.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], AnttCache.prototype, "protocol", void 0);
exports.AnttCache = AnttCache = __decorate([
    (0, mongoose_1.Schema)()
], AnttCache);
exports.AnttCacheSchema = mongoose_1.SchemaFactory.createForClass(AnttCache).index({ carrierTaxId: 1, carrierRntrc: 1 }, { unique: true });
//# sourceMappingURL=driveraux.schema.js.map