import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import type {
  CreateGraphDto,
  Graph,
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
  update(@Param('graphId') graphId: string, @Body() changes: Partial<Graph>) {
    return this.graphService.update(graphId, changes, {
      rootDirectory: __dirname,
    });
  }

  @Patch(':graphId/rename')
  rename(@Param('graphId') graphId: string, @Body('name') name: string) {
    return this.graphService.rename(graphId, name, {
      rootDirectory: __dirname,
    });
  }
}
