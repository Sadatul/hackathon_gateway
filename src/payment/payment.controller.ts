import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  handlePayment(@Body() data: any) {
    return this.paymentService.handlePayment(data);
  }
}
