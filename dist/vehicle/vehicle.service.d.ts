import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { VehicleInformation, VehicleSecurity, VehicleFuel } from '../interfaces/vehicle.interface';
export declare class VehicleService {
    private readonly configService;
    private readonly httpService;
    private mmAPIDomain;
    private readonly logger;
    constructor(configService: ConfigService, httpService: HttpService);
    httpPost(url: any, body?: {}): Promise<any>;
    getDoorCount(data: any): any;
    getVehicleInfo(id: string): Promise<VehicleInformation>;
    getVehicleSecurity(id: string): Promise<VehicleSecurity[]>;
    getVehicleFuel(id: string): Promise<VehicleFuel>;
    getVehicleBattery(id: string): Promise<VehicleFuel>;
}
