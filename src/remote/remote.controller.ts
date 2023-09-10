import { Controller, Post, Body, Param, Version } from '@nestjs/common';

import { RemoteService } from './remote.service';
import {
  RemoteRequest,
  RemoteResponse,
} from '../interfaces/remote.interface';

@Controller()
export class RemoteController {
  constructor(private readonly remoteService: RemoteService) {}

  @Post('/vehicles/:id/engine')
  @Version('1')
  engineHandler(
    @Param('id') id: string,
    @Body() body: RemoteRequest
  ): Promise<RemoteResponse> {
    console.log(body);
    return this.remoteService.engineHandler(id, body.action);
  }
}
