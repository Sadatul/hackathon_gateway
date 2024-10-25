import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { OtpModule } from './otp/otp.module';
import { TrainQueryModule } from './train_query/train_query.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [HealthModule, OtpModule, ConfigModule.forRoot( { isGlobal: true } ), TrainQueryModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
