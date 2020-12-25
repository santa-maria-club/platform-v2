import { promises } from 'fs';

/**
 * Shared Utils File Manager File System Token used For Dependency Injection purposes.
 */
export const SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM =
  'SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM';

/** Manage all the File System related methods. */
export interface ISharedUtilsFileManagerFileSystem {
  /**
   * Write a new file in a given location
   *
   * @param location A string pointing to the location to write the file.
   * @param content A string with the content to be written in the file.
   * @returns A promise that resolves once the file is written.
   */
  writeFile(location: string, content: string): Promise<void>;

  /**
   * Read the directory in the given location
   *
   * @param location A string pointing to the location of the directory.
   * @returns A promise that resolves with a list of files in the location given.
   */
  readdir(location: string): Promise<string[]>;

  /**
   * Read the file in the given location
   *
   * @param location A string pointing to the location where the file is.
   * @returns A promise that resolves with the content on the file found in location.
   */
  readFile(location: string): Promise<string>;

  /**
   * Rename a given file
   *
   * @param oldLocation A string pointing to the location where the file is.
   * @param newLocaton A string pointing to the location the file will be after renaming.
   * @returns A promise that resolves once the file has been renamed.
   */
  rename(oldLocation: string, newLocation: string): Promise<void>;
}

/** Concrete implementation of the ISharedUtilsFileManagerFileSystem */
export class SharedUtilsFileManagerFileSystem
  implements ISharedUtilsFileManagerFileSystem {
  /** @inheritDoc */
  writeFile(location: string, content: unknown) {
    return promises.writeFile(location, content);
  }

  /** @inheritDoc */
  rename(oldLocation: string, newLocation: string) {
    return promises.rename(oldLocation, newLocation);
  }

  /** @inheritDoc */
  readFile(location: string) {
    return promises.readFile(location, 'utf-8');
  }

  /** @inheritDoc */
  readdir(location: string) {
    return promises.readdir(location);
  }
}
