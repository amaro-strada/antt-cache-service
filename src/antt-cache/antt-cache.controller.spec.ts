import { Test, TestingModule } from '@nestjs/testing';
import { AnttCacheController } from './antt-cache.controller';

describe('AnttCacheController', () => {
  let controller: AnttCacheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnttCacheController],
    }).compile();

    controller = module.get<AnttCacheController>(AnttCacheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
