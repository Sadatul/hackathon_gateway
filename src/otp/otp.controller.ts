import { Body, Controller, Post, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { UserOtpDto } from './dto/user.otp.dto';

@Controller('otp')
export class OtpController {
  private readonly logger = new Logger(OtpController.name);

  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  async sendOtp(@Body() userCredentialDto: UserCredentialDto) {
    try {
      this.logger.log(`Attempting to send OTP to: ${userCredentialDto.email}`);
      return await this.otpService.sendOtp(userCredentialDto);
    } catch (error) {
      this.logger.error(`Failed to send OTP: ${error.message}`);
      throw new HttpException(
        'Failed to send OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('verify')
  async verifyOtp(@Body() userOtpDto: UserOtpDto) {
    try {
      this.logger.log(`Attempting to verify OTP for: ${userOtpDto.id}`);
      return await this.otpService.verifyOtp(userOtpDto);
    } catch (error) {
      this.logger.error(`Failed to verify OTP: ${error.message}`);
      throw new HttpException(
        'Failed to verify OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}