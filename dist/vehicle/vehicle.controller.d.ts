import { VehicleService } from './vehicle.service';
import { VehicleInformation, VehicleSecurity, VehicleFuel, VehicleBattery } from '../interfaces/vehicle.interface';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    getVehicleInfo(id: string): Promise<VehicleInformation>;
    getVehicleSecurity(id: string): Promise<VehicleSecurity[]>;
    getVehicleFuel(id: string): Promise<VehicleFuel>;
    getVehicleBattery(id: string): Promise<VehicleBattery>;
}
