import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import type {
  CreateGraphDto,
  Edge,
  Node,
} from '@platform/shared/utils/irrigation-api-interfaces';
import type { IGraphService } from './graph.service';
import { GRAPH_SERVICE } from './graph.service';

@Controller('graphs')
export class GraphController {
  constructor(@Inject(GRAPH_SERVICE) private graphService: IGraphService) {}

  @Post()
  create(@Body() createGraphDto: CreateGraphDto) {
    return this.graphService.create(createGraphDto, {
      rootDirectory: __dirname,
    });
  }

  @Get()
  list() {
    return this.graphService.list({
      rootDirectory: __dirname,
    });
  }

  @Put(':graphId')
  update(
    @Param('graphId') graphId: string,
    @Body('nodes') nodes: Node[],
    @Body('edges') edges: Edge[],
  ) {
    return this.graphService.update(graphId, nodes, edges, {
      rootDirectory: __dirname,
    });
  }
}
