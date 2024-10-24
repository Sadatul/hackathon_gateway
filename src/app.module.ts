import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HealthModule, AuthModule, ConfigModule.forRoot( { isGlobal: true } )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
