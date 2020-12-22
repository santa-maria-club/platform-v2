import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import type { CreateGraphDto } from '@platform/shared/utils/irrigation-api-interfaces';
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
}
