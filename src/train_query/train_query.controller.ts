import { Body, Controller, Post } from '@nestjs/common';
import { TrainQueryService } from './train_query.service';

type queryType = {
  from: string,
  to: string,
  journeyDate: string
}

@Controller('train-query')
export class TrainQueryController {
  constructor(private readonly trainQueryService: TrainQueryService) {}

  @Post()
  handleTrainQuery(@Body() query: queryType) {
    return this.trainQueryService.handleTrainQuery(query);
  }
}
