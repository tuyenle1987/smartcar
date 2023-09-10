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
var RemoteService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const remote_interface_1 = require("../interfaces/remote.interface");
let RemoteService = RemoteService_1 = class RemoteService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.logger = new common_1.Logger(RemoteService_1.name);
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
        return data;
    }
    ;
    async engineHandler(id, action) {
        const url = `${this.mmAPIDomain}/actionEngineService`;
        try {
            const data = await this.httpPost(url, {
                id,
                command: remote_interface_1.ENGINE_ACTION_COMMAND_ENUM[action],
            });
            console.log(data);
            const result = data.actionResult.status;
            return {
                status: remote_interface_1.REMOTE_COMMAND_ENUM[result],
            };
        }
        catch (err) {
            this.logger.error(err);
            throw err;
        }
    }
};
exports.RemoteService = RemoteService;
exports.RemoteService = RemoteService = RemoteService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], RemoteService);
//# sourceMappingURL=remote.service.js.map