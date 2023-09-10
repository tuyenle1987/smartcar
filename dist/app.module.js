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
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const http_logger_middleware_1 = require("@nest-toolbox/http-logger-middleware");
const nestjs_correlation_id_1 = require("@evanion/nestjs-correlation-id");
const app_config_1 = require("./configs/app.config");
const vehicle_module_1 = require("./vehicle/vehicle.module");
const remote_module_1 = require("./remote/remote.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(nestjs_correlation_id_1.CorrelationIdMiddleware).forRoutes('*');
        consumer.apply(http_logger_middleware_1.HttpLoggerMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default]
            }),
            axios_1.HttpModule,
            nestjs_correlation_id_1.CorrelationModule.forRoot(),
            vehicle_module_1.VehicleModule,
            remote_module_1.RemoteModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_1.Logger],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map