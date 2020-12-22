import { Module } from '@nestjs/common';
import { SharedUtilsFileManagerService } from './shared-utils-file-manager.service';

@Module({
  controllers: [],
  providers: [SharedUtilsFileManagerService],
  exports: [SharedUtilsFileManagerService],
})
export class SharedUtilsFileManagerModule {}
