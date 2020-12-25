import { Inject } from '@nestjs/common';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ISharedUtilsFileManagerFileSystem,
  SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM,
} from './shared-utils-file-manager-file-system.service';

/**
 * Shared Utils File Manager Service Token used For Dependency Injection purposes.
 */
export const SHARED_UTILS_FILE_MANAGER_SERVICE =
  'SHARED_UTILS_FILE_MANAGER_SERVICE';

/** Manage all the File Manager related methods. */
export interface ISharedUtilsFileManagerService {
  /**
   * Write a new file in a given location
   *
   * @param location A string pointing to the location to write the file.
   * @param content An object with the content to be written in the file.
   * @returns An observable that completes once the file has been written.
   */
  writeFile(location: string, content: unknown): Observable<void>;

  /**
   * Read a directory and return a list of files
   *
   * @param location A string pointing to the location to read the directory.
   * @returns An observable that emits a list of file names inside the location
   * provided.
   */
  readDirectory(location: string): Observable<string[]>;

  /**
   * Read a file and return it as an object
   *
   * @param location A string pointing to the location to read the file.
   * @returns An observable that emits an object with the file content once read.
   */
  readFile(location: string): Observable<unknown>;

  /**
   * Rename a given file
   *
   * @param oldLocation A string pointing to the location of the file to rename.
   * @param newLocation A string pointing to the new location of the file.
   * @returns An observable that completes once the rename operation is done.
   */
  rename(oldLocation: string, newLocation: string): Observable<void>;

  /**
   * Delete a given file
   *
   * @param location A string pointing to the location of the file to delete.
   * @returns An observable that completes once the delete operation is done.
   */
  deleteFile(location: string): Observable<void>;
}

/** Concrete implementation of the ISharedUtilsFileManagerService */
export class SharedUtilsFileManagerService
  implements ISharedUtilsFileManagerService {
  constructor(
    @Inject(SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM)
    private fs: ISharedUtilsFileManagerFileSystem,
  ) {}

  /** @inheritDoc */
  writeFile(location: string, content: unknown) {
    return defer(() => this.fs.writeFile(location, JSON.stringify(content)));
  }

  /** @inheritDoc */
  readDirectory(location: string) {
    return defer(() => this.fs.readdir(location));
  }

  /** @inheritDoc */
  readFile(location: string) {
    return defer(() => this.fs.readFile(location)).pipe(
      map((file) => JSON.parse(file)),
    );
  }

  /** @inheritDoc */
  rename(oldLocation: string, newLocation: string) {
    return defer(() => this.fs.rename(oldLocation, newLocation));
  }

  /** @inheritDoc */
  deleteFile(location: string) {
    return defer(() => this.fs.deleteFile(location));
  }
}
