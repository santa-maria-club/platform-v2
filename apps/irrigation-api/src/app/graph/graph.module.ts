import { Module } from '@nestjs/common';

import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { SharedUtilsFileManagerModule } from '@platform/shared/utils/file-manager';

@Module({
  imports: [SharedUtilsFileManagerModule],
  providers: [GraphService],
  controllers: [GraphController],
})
export class GraphModule {}
