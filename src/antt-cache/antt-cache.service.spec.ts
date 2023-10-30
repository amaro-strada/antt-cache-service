import { Test, TestingModule } from '@nestjs/testing';
import { AnttCacheService } from './antt-cache.service';

describe('AnttCacheService', () => {
  let service: AnttCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnttCacheService],
    }).compile();

    service = module.get<AnttCacheService>(AnttCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
