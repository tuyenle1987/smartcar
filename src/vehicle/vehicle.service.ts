import { Logger, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import {
  VehicleInformation,
  VehicleSecurity,
  VehicleFuel,
  VehicleBattery,
} from '../interfaces/vehicle.interface';
import { getData } from '../util/dataUtil';

@Injectable()
export class VehicleService {
  private mmAPIDomain: string;
  private readonly logger = new Logger(VehicleService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.mmAPIDomain = this.configService.get<string>('mmAPIDomain');
  }

  async httpPost(url, body={}) {
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
  };

  getDoorCount(data) {
    let doorCount = null;
    const isFourDoor = getData('fourDoorSedan', data);
    const isTwoDoor = getData('twoDoorCoupe', data);

    if (isFourDoor) doorCount = 4;
    if (isTwoDoor) doorCount = 2;

    return doorCount;
  }

  async getVehicleInfo(id: string): Promise<VehicleInformation> {
    const url = `${this.mmAPIDomain}/getVehicleInfoService`;

    try {
      const data = await this.httpPost(url, { id });

      return {
        vin: getData('vin', data),
        color: getData('color', data),
        doorCount: this.getDoorCount(data),
        driveTrain: getData('driveTrain', data),
      };
    } catch(err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getVehicleSecurity(id: string): Promise<VehicleSecurity[]> {
    const url = `${this.mmAPIDomain}/getSecurityStatusService`;

    try {
      const data = await this.httpPost(url, { id });

      const frontLeft = data.doors.values.filter(value => value.location?.value === 'frontLeft')[0];
      const frontRight = data.doors.values.filter(value => value.location?.value === 'frontRight')[0];
      const backLeft = data.doors.values.filter(value => value.location?.value === 'backLeft')[0];
      const backRight = data.doors.values.filter(value => value.location?.value === 'backRight')[0];

      return [
        { location: 'frontLeft', locked: getData('locked', frontLeft) },
        { location: 'frontRight', locked: getData('locked', frontRight) },
        { location: 'backLeft', locked: getData('locked', backLeft) },
        { location: 'backRight', locked: getData('locked', backRight) },
      ];
    } catch(err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getVehicleFuel(id: string): Promise<VehicleFuel> {
    const url = `${this.mmAPIDomain}/getEnergyService`;

    try {
      const data = await this.httpPost(url, { id });

      return {
        percent: getData('tankLevel', data),
      };
    } catch(err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getVehicleBattery(id: string): Promise<VehicleFuel> {
    const url = `${this.mmAPIDomain}/getEnergyService`;

    try {
      const data = await this.httpPost(url, { id });

      return {
        percent: getData('batteryLevel', data),
      };
    } catch(err) {
      this.logger.error(err);
      throw err;
    }
  }
}
