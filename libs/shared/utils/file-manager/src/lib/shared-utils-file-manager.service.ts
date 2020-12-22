import { promises } from 'fs';
import { defer, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const SHARED_UTILS_FILE_MANAGER_SERVICE =
  'SHARED_UTILS_FILE_MANAGER_SERVICE';

export interface ISharedUtilsFileManagerService {
  fs: {
    writeFile: (location: string, content: string) => Promise<void>;
    readdir: (location: string) => Promise<string[]>;
    readFile: (location: string) => Promise<unknown>;
  };
  writeFile: (location: string, content: unknown) => Observable<void>;
  readDirectory: (location: string) => Observable<string[]>;
  readFile: (location: string) => Observable<unknown>;
}

export class SharedUtilsFileManagerServiceMock
  implements ISharedUtilsFileManagerService {
  fs: null;
  writeFile() {
    return of(null);
  }
  readDirectory() {
    return of(['sample.json', 'sample-123.json']);
  }
  readFile(location: string) {
    return of({
      id: '123',
      name: 'name-123',
      location,
      nodes: [],
      edges: [],
    });
  }
}

export class SharedUtilsFileManagerService
  implements ISharedUtilsFileManagerService {
  fs = promises;

  writeFile(location: string, content: unknown) {
    return defer(() => this.fs.writeFile(location, JSON.stringify(content)));
  }

  readDirectory(location: string) {
    return defer(() => this.fs.readdir(location));
  }

  readFile(location: string) {
    return defer(() => this.fs.readFile(location, 'utf8')).pipe(
      map((file) => JSON.parse(file)),
    );
  }
}
