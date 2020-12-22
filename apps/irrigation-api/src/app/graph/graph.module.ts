import { Module } from '@nestjs/common';

import { GraphService, GRAPH_SERVICE } from './graph.service';
import { GraphController } from './graph.controller';
import { SharedUtilsFileManagerModule } from '@platform/shared/utils/file-manager';

@Module({
  imports: [SharedUtilsFileManagerModule],
  providers: [{ provide: GRAPH_SERVICE, useClass: GraphService }],
  controllers: [GraphController],
})
export class GraphModule {}
