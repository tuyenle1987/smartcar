export interface VehicleInformation {
    vin?: string;
    color?: string;
    doorCount?: number;
    driveTrain?: string;
}
export interface VehicleSecurity {
    location?: string;
    locked?: boolean;
}
export interface VehicleFuel {
    percent?: number;
}
export interface VehicleBattery {
    percent?: number;
}
