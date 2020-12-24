import { Inject } from '@nestjs/common';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ISharedUtilsFileManagerFileSystem,
  SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM,
} from './shared-utils-file-manager-file-system.service';

export const SHARED_UTILS_FILE_MANAGER_SERVICE =
  'SHARED_UTILS_FILE_MANAGER_SERVICE';

export interface ISharedUtilsFileManagerService {
  writeFile(location: string, content: unknown): Observable<void>;
  readDirectory(location: string): Observable<string[]>;
  readFile(location: string): Observable<unknown>;
  rename(oldLocation: string, newLocation: string): Observable<void>;
}

export class SharedUtilsFileManagerService
  implements ISharedUtilsFileManagerService {
  constructor(
    @Inject(SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM)
    private fs: ISharedUtilsFileManagerFileSystem,
  ) {}

  writeFile(location: string, content: unknown) {
    return defer(() => this.fs.writeFile(location, JSON.stringify(content)));
  }

  readDirectory(location: string) {
    return defer(() => this.fs.readdir(location));
  }

  readFile(location: string) {
    return defer(() => this.fs.readFile(location)).pipe(
      map((file) => JSON.parse(file)),
    );
  }

  rename(oldLocation: string, newLocation: string) {
    return defer(() => this.fs.rename(oldLocation, newLocation));
  }
}
