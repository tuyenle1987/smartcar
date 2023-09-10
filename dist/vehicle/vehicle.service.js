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
var VehicleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const dataUtil_1 = require("../util/dataUtil");
let VehicleService = VehicleService_1 = class VehicleService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.logger = new common_1.Logger(VehicleService_1.name);
        this.mmAPIDomain = this.configService.get('mmAPIDomain');
    }
    async httpPost(url, body = {}) {
        const { data, status } = await this.httpService.axiosRef.post(url, {
            responseType: 'JSON',
            ...body,
        });
        if (status !== 200) {
            throw 'There was an issue with getting data from mm!';
        }
        if (!data.data) {
            throw 'Missing data!';
        }
        return data.data;
    }
    ;
    getDoorCount(data) {
        let doorCount = null;
        const isFourDoor = (0, dataUtil_1.getData)('fourDoorSedan', data);
        const isTwoDoor = (0, dataUtil_1.getData)('twoDoorCoupe', data);
        if (isFourDoor)
            doorCount = 4;
        if (isTwoDoor)
            doorCount = 2;
        return doorCount;
    }
    async getVehicleInfo(id) {
        const url = `${this.mmAPIDomain}/getVehicleInfoService`;
        try {
            const data = await this.httpPost(url, { id });
            return {
                vin: (0, dataUtil_1.getData)('vin', data),
                color: (0, dataUtil_1.getData)('color', data),
                doorCount: this.getDoorCount(data),
                driveTrain: (0, dataUtil_1.getData)('driveTrain', data),
            };
        }
        catch (err) {
            this.logger.error(err);
            throw err;
        }
    }
    async getVehicleSecurity(id) {
        const url = `${this.mmAPIDomain}/getSecurityStatusService`;
        try {
            const data = await this.httpPost(url, { id });
            const frontLeft = data.doors.values.filter(value => value.location?.value === 'frontLeft')[0];
            const frontRight = data.doors.values.filter(value => value.location?.value === 'frontRight')[0];
            const backLeft = data.doors.values.filter(value => value.location?.value === 'backLeft')[0];
            const backRight = data.doors.values.filter(value => value.location?.value === 'backRight')[0];
            return [
                { location: 'frontLeft', locked: (0, dataUtil_1.getData)('locked', frontLeft) },
                { location: 'frontRight', locked: (0, dataUtil_1.getData)('locked', frontRight) },
                { location: 'backLeft', locked: (0, dataUtil_1.getData)('locked', backLeft) },
                { location: 'backRight', locked: (0, dataUtil_1.getData)('locked', backRight) },
            ];
        }
        catch (err) {
            this.logger.error(err);
            throw err;
        }
    }
    async getVehicleFuel(id) {
        const url = `${this.mmAPIDomain}/getEnergyService`;
        try {
            const data = await this.httpPost(url, { id });
            return {
                percent: (0, dataUtil_1.getData)('tankLevel', data),
            };
        }
        catch (err) {
            this.logger.error(err);
            throw err;
        }
    }
    async getVehicleBattery(id) {
        const url = `${this.mmAPIDomain}/getEnergyService`;
        try {
            const data = await this.httpPost(url, { id });
            return {
                percent: (0, dataUtil_1.getData)('batteryLevel', data),
            };
        }
        catch (err) {
            this.logger.error(err);
            throw err;
        }
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = VehicleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map