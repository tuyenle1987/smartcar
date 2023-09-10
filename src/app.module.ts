import { Module, MiddlewareConsumer, RequestMethod, Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HttpLoggerMiddleware } from '@nest-toolbox/http-logger-middleware';
import {
  CorrelationIdMiddleware,
  CorrelationModule,
} from '@evanion/nestjs-correlation-id';

import config from './configs/app.config';
import { VehicleModule } from './vehicle/vehicle.module';
import { RemoteModule } from './remote/remote.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    HttpModule,
    CorrelationModule.forRoot(),
    VehicleModule,
    RemoteModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
    consumer.apply(HttpLoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
