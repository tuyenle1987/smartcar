import { Controller, Get, Param, Version } from '@nestjs/common';

import { VehicleService } from './vehicle.service';
import {
  VehicleInformation,
  VehicleSecurity,
  VehicleFuel,
  VehicleBattery,
} from '../interfaces/vehicle.interface';

@Controller()
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Version('1')
  @Get('/vehicles/:id')
  @Version('1')
  getVehicleInfo(
    @Param('id') id: string,
  ): Promise<VehicleInformation> {
    return this.vehicleService.getVehicleInfo(id);
  }

  @Version('1')
  @Get('/vehicles/:id/doors')
  @Version('1')
  getVehicleSecurity(
    @Param('id') id: string,
  ): Promise<VehicleSecurity[]> {
    return this.vehicleService.getVehicleSecurity(id);
  }

  @Version('1')
  @Get('/vehicles/:id/fuel')
  @Version('1')
  getVehicleFuel(
    @Param('id') id: string,
  ): Promise<VehicleFuel> {
    return this.vehicleService.getVehicleFuel(id);
  }

  @Version('1')
  @Get('/vehicles/:id/battery')
  @Version('1')
  getVehicleBattery(
    @Param('id') id: string,
  ): Promise<VehicleBattery> {
    return this.vehicleService.getVehicleBattery(id);
  }
}
