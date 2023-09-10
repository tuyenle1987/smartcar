import { Logger, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import {
  RemoteResponse,
  ACTION_ENUM,
  ENGINE_ACTION_COMMAND_ENUM,
  REMOTE_COMMAND_ENUM,
} from '../interfaces/remote.interface';
import { getData } from '../util/dataUtil';

@Injectable()
export class RemoteService {
  private mmAPIDomain: string;
  private readonly logger = new Logger(RemoteService.name);

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

    return data;
  };

  async engineHandler(
    id: string,
    action: ACTION_ENUM,
  ): Promise<RemoteResponse> {
    const url = `${this.mmAPIDomain}/actionEngineService`;

    try {
      const data = await this.httpPost(url, {
        id,
        command: ENGINE_ACTION_COMMAND_ENUM[action],
      });
      console.log(data);
      const result = data.actionResult.status;

      return {
        status: REMOTE_COMMAND_ENUM[result],
      };
    } catch(err) {
      this.logger.error(err);
      throw err;
    }
  }
}
