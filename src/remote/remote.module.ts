import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RemoteController } from './remote.controller';
import { RemoteService } from './remote.service';

@Module({
  imports: [HttpModule],
  controllers: [RemoteController],
  providers: [RemoteService],
})

export class RemoteModule {
  configure() {}
}
