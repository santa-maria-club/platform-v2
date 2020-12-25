import { Module } from '@nestjs/common';

import {
  SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM,
  SharedUtilsFileManagerFileSystem,
} from './shared-utils-file-manager-file-system.service';
import {
  SharedUtilsFileManagerService,
  SHARED_UTILS_FILE_MANAGER_SERVICE,
} from './shared-utils-file-manager.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: SHARED_UTILS_FILE_MANAGER_SERVICE,
      useClass: SharedUtilsFileManagerService,
    },
    {
      provide: SHARED_UTILS_FILE_MANAGER_FILE_SYSTEM,
      useClass: SharedUtilsFileManagerFileSystem,
    },
  ],
  exports: [
    {
      provide: SHARED_UTILS_FILE_MANAGER_SERVICE,
      useClass: SharedUtilsFileManagerService,
    },
  ],
})
export class SharedUtilsFileManagerModule {}
