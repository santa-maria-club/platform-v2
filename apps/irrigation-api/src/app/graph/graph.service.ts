import { Injectable } from '@nestjs/common';
import { promises } from 'fs';

import type { CreateGraphDto } from '@platform/shared/utils/irrigation-api-interfaces';
import { createGraphFromCreateGraphDto } from '@platform/shared/utils/irrigation-creators';

@Injectable()
export class GraphService {
  async create(createGraphDto: CreateGraphDto) {
    try {
      const location = `${__dirname}/assets/graphs/${createGraphDto.name}.json`;
      const graph = createGraphFromCreateGraphDto(createGraphDto, { location });
      await promises.writeFile(
        `${__dirname}/assets/graphs/${graph.name}.json`,
        JSON.stringify(graph),
      );
      return graph;
    } catch (err) {
      throw Error('Error creating a graph');
    }
  }
}
