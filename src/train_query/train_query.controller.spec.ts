import { Test, TestingModule } from '@nestjs/testing';
import { TrainQueryController } from './train_query.controller';

describe('TrainQueryController', () => {
  let controller: TrainQueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainQueryController],
    }).compile();

    controller = module.get<TrainQueryController>(TrainQueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
