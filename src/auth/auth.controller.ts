import { Controller, Post, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async login(@Req() req: Request) {
    const url = process.env.AUTH_SERVICE_URL + ':' + process.env.AUTH_SERVICE_PORT + '/auth/login';
    return this.httpService.post(url, req.body).pipe(map(response => response.data));
  }

  @Post('register')
  async register(@Req() req: Request) {
    const url = process.env.AUTH_SERVICE_URL + ':' + process.env.AUTH_SERVICE_PORT + '/auth/register';
    return this.httpService.post(url, req.body).pipe(map(response => response.data));
  }
}
