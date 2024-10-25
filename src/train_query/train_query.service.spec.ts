import { Test, TestingModule } from '@nestjs/testing';
import { TrainQueryService } from './train_query.service';

describe('TrainQueryService', () => {
  let service: TrainQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainQueryService],
    }).compile();

    service = module.get<TrainQueryService>(TrainQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
