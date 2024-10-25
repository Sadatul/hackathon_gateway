import { Module } from '@nestjs/common';
import { TrainQueryController } from './train_query.controller';
import { TrainQueryService } from './train_query.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'TRAIN_QUERY_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'hackathonQueue_train_queue',
            queueOptions: {
              durable: true,
            },
            retry: {
              count: 5,
              interval: 1000,
            },
            prefetchCount: 1,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TrainQueryController],
  providers: [TrainQueryService]
})
export class TrainQueryModule {}
