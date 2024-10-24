import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth() {
    return HttpStatus.OK;
  }
}
