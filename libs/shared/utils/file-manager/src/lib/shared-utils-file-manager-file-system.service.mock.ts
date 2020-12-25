export const SHARED_UTILS_FILE_MANAGER_FS = 'SHARED_UTILS_FILE_MANAGER_FS';

import type { ISharedUtilsFileManagerFileSystem } from './shared-utils-file-manager-file-system.service';

/** Mock implementation of ISharedUtilsFileManagerFileSystem  */
export class SharedUtilsFileManagerFileSystemMock
  implements ISharedUtilsFileManagerFileSystem {
  /**
   * Mock version of the writeFile method in ISharedUtilsFileManagerFileSystem
   *
   * @returns
   * ```typescript
   * null
   * ```
   */
  writeFile() {
    return null;
  }

  /**
   * Mock version of the rename method in ISharedUtilsFileManagerFileSystem
   *
   * @returns
   * ```typescript
   * null
   * ```
   */
  rename() {
    return null;
  }

  /**
   * Mock version of the readFile method in ISharedUtilsFileManagerFileSystem
   *
   * @returns
   * ```typescript
   * null
   * ```
   */
  readFile() {
    return null;
  }

  /**
   * Mock version of the readdir method in ISharedUtilsFileManagerFileSystem
   *
   * @returns
   * ```typescript
   * null
   * ```
   */
  readdir() {
    return null;
  }

  /**
   * Mock version of the readdir method in ISharedUtilsFileManagerFileSystem
   *
   * @returns
   * ```typescript
   * null
   * ```
   */
  deleteFile() {
    return null;
  }
}
