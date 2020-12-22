import { promises } from 'fs';
import { defer, Observable, of } from 'rxjs';

export const SHARED_UTILS_FILE_MANAGER_SERVICE =
  'SHARED_UTILS_FILE_MANAGER_SERVICE';

export interface ISharedUtilsFileManagerService {
  fs: {
    writeFile: (location: string, content: string) => void;
  };
  writeFile: (location: string, content: unknown) => Observable<void>;
}

export class SharedUtilsFileManagerServiceMock
  implements ISharedUtilsFileManagerService {
  fs: null;
  writeFile() {
    return of(null);
  }
}

export class SharedUtilsFileManagerService
  implements ISharedUtilsFileManagerService {
  fs = promises;

  writeFile(location: string, content: unknown) {
    return defer(() => this.fs.writeFile(location, JSON.stringify(content)));
  }
}
