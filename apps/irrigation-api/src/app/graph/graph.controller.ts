import { Body, Controller, Post } from '@nestjs/common';

import { CreateGraphDto } from '@platform/shared/utils/irrigation-api-interfaces';
import { GraphService } from './graph.service';

@Controller('graphs')
export class GraphController {
  constructor(private graphService: GraphService) {}

  @Post()
  create(@Body() createGraphDto: CreateGraphDto) {
    return this.graphService.create(createGraphDto);
  }
}
