import { Module } from '@nestjs/common';
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
  ],
  exports: [
    {
      provide: SHARED_UTILS_FILE_MANAGER_SERVICE,
      useClass: SharedUtilsFileManagerService,
    },
  ],
})
export class SharedUtilsFileManagerModule {}
