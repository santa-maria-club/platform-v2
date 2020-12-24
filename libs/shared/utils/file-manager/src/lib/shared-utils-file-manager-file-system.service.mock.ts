export const SHARED_UTILS_FILE_MANAGER_FS = 'SHARED_UTILS_FILE_MANAGER_FS';

import type { ISharedUtilsFileManagerFileSystem } from './shared-utils-file-manager-file-system.service';

export class SharedUtilsFileManagerFileSystemMock
  implements ISharedUtilsFileManagerFileSystem {
  writeFile() {
    return null;
  }

  rename() {
    return null;
  }

  readFile() {
    return null;
  }

  readdir() {
    return null;
  }
}
