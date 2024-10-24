import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OtpModule } from './otp/otp.module';
import { TrainQueryModule } from './train_query/train_query.module';

@Module({
  imports: [HealthModule, AuthModule, OtpModule, ConfigModule.forRoot( { isGlobal: true } ), TrainQueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
