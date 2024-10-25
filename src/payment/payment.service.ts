import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(@Inject('PAYMENT_SERVICE') private paymentServiceClient: ClientProxy) {}

  async handlePayment(data: any) {
    return this.paymentServiceClient.send({ cmd: 'confirm_pay_payment_service' }, data);
  }
}
