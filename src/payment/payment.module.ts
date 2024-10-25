import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'hackathonQueue_payment',
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
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
