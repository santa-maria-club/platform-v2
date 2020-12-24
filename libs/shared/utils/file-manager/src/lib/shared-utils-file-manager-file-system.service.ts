import { promises } from 'fs';

export const SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM =
  'SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM';

export interface ISharedUtilsFileManagerFileSystem {
  writeFile(location: string, content: string): Promise<void>;
  readdir(location: string): Promise<string[]>;
  readFile(location: string): Promise<string>;
  rename(oldLocation: string, newLocation: string): Promise<void>;
}

export class SharedUtilsFileManagerFileSystem
  implements ISharedUtilsFileManagerFileSystem {
  writeFile(location: string, content: unknown) {
    return promises.writeFile(location, content);
  }

  rename(oldLocation: string, newLocation: string) {
    return promises.rename(oldLocation, newLocation);
  }

  readFile(location: string) {
    return promises.readFile(location, 'utf-8');
  }

  readdir(location: string) {
    return promises.readdir(location);
  }
}
