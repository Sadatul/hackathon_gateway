import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { retry, timeout } from 'rxjs';

@Injectable()
export class TrainQueryService {
  constructor(@Inject('TRAIN_QUERY_SERVICE') private trainQueryClient: ClientProxy) {}

  handleTrainQuery(query: any) {
    return this.trainQueryClient
    .send({ cmd: 'query_train_service' }, query)
    .pipe(timeout(5000), retry(3));
  }
}
