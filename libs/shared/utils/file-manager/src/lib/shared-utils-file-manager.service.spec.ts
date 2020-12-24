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

  describe('Read Directory Method', () => {
    it('should read directory and return a list of files', () => {
      // arrange
      const path = `${__dirname}/assets/graphs`;
      const readDirSpy = jest.spyOn(service.fs, 'readdir');
      // act
      service.readDirectory(path).subscribe();
      // assert
      expect(readDirSpy).toHaveBeenCalled();
      expect(readDirSpy).toHaveBeenCalledWith(path);
    });
  });

  describe('Read File Method', () => {
    it('should read a file and return its content', () => {
      // arrange
      const path = `${__dirname}/assets/graphs`;
      const readFileSpy = jest.spyOn(service.fs, 'readFile');
      // act
      service.readFile(path).subscribe();
      // assert
      expect(readFileSpy).toHaveBeenCalled();
      expect(readFileSpy).toHaveBeenCalledWith(path, 'utf8');
    });
  });

  describe('Rename Method', () => {
    it('should rename a file', () => {
      // arrange
      const oldLocation = `${__dirname}/assets/graphs/sample.json`;
      const newLocation = `${__dirname}/assets/graphs/sample.json`;
      const renameSpy = jest.spyOn(service.fs, 'rename');
      // act
      service.rename(oldLocation, newLocation).subscribe();
      // assert
      expect(renameSpy).toHaveBeenCalled();
      expect(renameSpy).toHaveBeenCalledWith(oldLocation, newLocation);
    });
  });
});
