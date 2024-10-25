import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserCredentialDto } from './dto/user.credential.dto';
import { UserOtpDto } from './dto/user.otp.dto';
import { catchError, firstValueFrom, retry, timeout } from 'rxjs';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(@Inject('OTP_SERVICE') private otpClient: ClientProxy) {}

  async onModuleInit() {
    try {
      await this.otpClient.connect();
      this.logger.log('Successfully connected to RabbitMQ');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      throw error;
    }
  }

  async sendOtp(userCredentialDto: UserCredentialDto) {
    try {
      await firstValueFrom(
        this.otpClient.emit('send_otp', userCredentialDto).pipe(
          timeout(5000),
          retry(3),
          catchError((error) => {
            this.logger.error(`Failed to send OTP: ${error.message}`, error.stack);
            throw error;
          })
        )
      );
      
      this.logger.log(`OTP sent to user: ${userCredentialDto.email}`);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      this.logger.error(`Failed to send OTP: ${error.message}`);
      throw error;
    }
  }

  async verifyOtp(userOtpDto: UserOtpDto) {
    console.log(userOtpDto);
    try {
      const result = await firstValueFrom(
        this.otpClient.send('verify_otp', userOtpDto).pipe(
          timeout(5000),
          retry(3),
          catchError((error) => {
            this.logger.error(`Failed to verify OTP: ${error.message}`, error.stack);
            throw error;
          })
        )
      );
      
      this.logger.log(`OTP verification completed for user: ${userOtpDto.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to verify OTP: ${error.message}`);
      throw error;
    }
  }
}