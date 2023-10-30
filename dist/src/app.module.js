"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const driveraux_schema_1 = require("../schema/driveraux.schema");
const antt_cache_service_1 = require("./antt-cache/antt-cache.service");
const antt_cache_controller_1 = require("./antt-cache/antt-cache.controller");
const auth_module_1 = require("./auth/auth.module");
const health_module_1 = require("./health/health.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.DB_URI, {
                dbName: process.env.DB_NAME,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: process.env.DB_DATABASE, schema: driveraux_schema_1.AnttCacheSchema }]),
            auth_module_1.AuthModule,
            health_module_1.HealthModule,
        ],
        controllers: [app_controller_1.AppController, antt_cache_controller_1.AnttCacheController],
        providers: [app_service_1.AppService, antt_cache_service_1.AnttCacheService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map