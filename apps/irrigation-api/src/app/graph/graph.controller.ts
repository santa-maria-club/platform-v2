import {
  Body,
  Controller,
  Delete,
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
import { Observable } from 'rxjs';
import type { IGraphService } from './graph.service';
import { GRAPH_SERVICE } from './graph.service';

/** This class intention is to hold every endpoint related to the graphs.  */
@Controller('graphs')
export class GraphController {
  constructor(@Inject(GRAPH_SERVICE) private graphService: IGraphService) {}

  /**
   * Endpoint /api/graphs POST
   *
   * This endpoint intention is to allow consumers creating graphs via HTTP.
   *
   * @param createGraphDto
   */
  @Post()
  create(@Body() createGraphDto: CreateGraphDto): Observable<Graph> {
    return this.graphService.create(createGraphDto, {
      rootDirectory: __dirname,
    });
  }

  /**
   * Endpoint /api/graphs GET
   *
   * This endpoint intention is to allow consumers retrieving all the graphs
   * via HTTP.
   */
  @Get()
  list(): Observable<Graph[]> {
    return this.graphService.list({
      rootDirectory: __dirname,
    });
  }

  /**
   * Endpoint /graphs/:graphId PUT
   *
   * This endpoint intention is to allow consumers updating a graph via HTTP.
   *
   * @param graphId Identifier of the graph to update.
   * @param changes Set of fields to update from the graph.
   */
  @Put(':graphId')
  update(
    @Param('graphId') graphId: string,
    @Body() changes: Partial<Graph>,
  ): Observable<Graph> {
    return this.graphService.update(graphId, changes, {
      rootDirectory: __dirname,
    });
  }

  /**
   * Endpoint /graphs/:graphId/rename PATCH
   *
   * This endpoint intention is to allow consumers renaming a graph via HTTP.
   *
   * @param graphId Identifier of the graph to rename.
   * @param name New name for the graph.
   */
  @Patch(':graphId/rename')
  rename(
    @Param('graphId') graphId: string,
    @Body('name') name: string,
  ): Observable<Graph> {
    return this.graphService.rename(graphId, name, {
      rootDirectory: __dirname,
    });
  }

  /**
   * Endpoint /graphs/:graphId DELETE
   *
   * This endpoint intention is to allow consumers deleting a graph via HTTP.
   *
   * @param graphId Identifier of the graph to delete.
   */
  @Delete(':graphId')
  delete(@Param('graphId') graphId: string): Observable<boolean> {
    return this.graphService.delete(graphId, {
      rootDirectory: __dirname,
    });
  }
}
