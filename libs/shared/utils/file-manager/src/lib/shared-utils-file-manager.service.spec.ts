import { Test } from '@nestjs/testing';

import {
  SHARED_UTILS_FILE_MANAGER_SERVICE,
  ISharedUtilsFileManagerService,
  SharedUtilsFileManagerService,
} from './shared-utils-file-manager.service';

describe('SharedUtilsFileManagerService', () => {
  let service: ISharedUtilsFileManagerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: SHARED_UTILS_FILE_MANAGER_SERVICE,
          useClass: SharedUtilsFileManagerService,
        },
      ],
    }).compile();

    service = module.get<ISharedUtilsFileManagerService>(
      SHARED_UTILS_FILE_MANAGER_SERVICE,
    );
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('Write File Method', () => {
    it('should store content as a JSON string', () => {
      // arrange
      const name = 'test';
      const path = `${__dirname}/assets/graphs/${name}.json`;
      const writeFileSpy = jest.spyOn(service.fs, 'writeFile');
      const content = { name };
      const contentAsString = JSON.stringify(content);
      // act
      service.writeFile(path, content).subscribe();
      // assert
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(path, contentAsString);
    });
  });
});
