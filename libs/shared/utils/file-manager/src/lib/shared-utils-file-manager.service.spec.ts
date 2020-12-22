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

  describe('Write File Method', () => {
    it('should save the file in assets/graphs/<name>.json', () => {
      // arrange
      const name = 'test';
      const path = `${__dirname}/assets/graphs/${name}.json`;
      const writeFileSpy = jest.spyOn(service.fs, 'writeFile');
      const contentAsString = '{}';
      // act
      service.writeFile(name, {}).subscribe();
      // assert
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(path, contentAsString);
    });

    it('should store content as a JSON string', () => {
      // arrange
      const name = 'test';
      const path = `${__dirname}/assets/graphs/${name}.json`;
      const writeFileSpy = jest.spyOn(service.fs, 'writeFile');
      const content = { name };
      const contentAsString = JSON.stringify(content);
      // act
      service.writeFile(name, content).subscribe();
      // assert
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(path, contentAsString);
    });
  });
});
