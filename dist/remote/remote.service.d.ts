import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RemoteResponse, ACTION_ENUM } from '../interfaces/remote.interface';
export declare class RemoteService {
    private readonly configService;
    private readonly httpService;
    private mmAPIDomain;
    private readonly logger;
    constructor(configService: ConfigService, httpService: HttpService);
    httpPost(url: any, body?: {}): Promise<any>;
    engineHandler(id: string, action: ACTION_ENUM): Promise<RemoteResponse>;
}
