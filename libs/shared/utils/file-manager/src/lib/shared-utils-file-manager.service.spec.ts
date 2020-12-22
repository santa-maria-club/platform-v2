import { Test } from '@nestjs/testing';
import { SharedUtilsFileManagerService } from './shared-utils-file-manager.service';

describe('SharedUtilsFileManagerService', () => {
  let service: SharedUtilsFileManagerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SharedUtilsFileManagerService],
    }).compile();

    service = module.get(SharedUtilsFileManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
