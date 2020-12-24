import { Observable, of } from 'rxjs';

import type {
  CreateGraphDto,
  Graph,
} from '@platform/shared/utils/irrigation-api-interfaces';
import type { GraphOptions, IGraphService } from './graph.service';

/** Mock implementation of IGraphService  */
export class GraphServiceMock implements IGraphService {
  /**
   * Mock version of the create method from IGraphService
   *
   * @param createGraphDto Partial version of the graph prior to it's creation.
   * @param options Options that allow customization of the method's behavior.
   * @returns
   * ```typescript
   * of([{
   *  id: '123',
   *  name: createGraphDto.name,
   *  location: `${options.rootDirectory}/assets/graphs/${createGraphDto.name}.json`,
   *  nodes: [],
   *  edges: [],
   * }])
   * ```
   */
  create(
    createGraphDto: CreateGraphDto,
    options: GraphOptions,
  ): Observable<Graph> {
    return of({
      id: '123',
      name: createGraphDto.name,
      location: `${options.rootDirectory}/assets/graphs/${createGraphDto.name}.json`,
      nodes: [],
      edges: [],
    });
  }

  /**
   * Mock version of the list method from IGraphService.
   *
   * @param options Options that allow customization of the method's behavior.
   * @returns
   * ```typescript
   * of([{
   *  id: '123',
   *  name: 'name-123',
   *  location: `${options.rootDirectory}/assets/graphs/name-123.json`,
   *  nodes: [],
   *  edges: [],
   * }])
   * ```
   */
  list(options: GraphOptions): Observable<Graph[]> {
    return of([
      {
        id: '123',
        name: 'name-123',
        location: `${options.rootDirectory}/assets/graphs/name-123.json`,
        nodes: [],
        edges: [],
      },
    ]);
  }

  /**
   * Mock version of the view method from IGraphService.
   *
   * @param graphId Identifier for the graph to retrieve.
   * @param options Options that allow customization of the method's behavior.
   * @returns
   * ```typescript
   * of({
   *  id: '123',
   *  name: 'name-123',
   *  location: `${options.rootDirectory}/assets/graphs/name-123.json`,
   *  nodes: [],
   *  edges: [],
   * })
   * ```
   */
  view(graphId: string, options: GraphOptions) {
    return of({
      id: graphId,
      name: 'name-123',
      location: `${options.rootDirectory}/assets/graphs/name-123.json`,
      nodes: [],
      edges: [],
    });
  }

  /**
   * Mock version of the update method from IGraphService.
   *
   * @param graphId Identifier of the graph to update.
   * @param changes Set of fields from graph to update.
   * @param options Options that allow customization of the method's behavior.
   * @returns
   * ```typescript
   * of({
   *  id: graphId,
   *  name: changes.name,
   *  location: `${options.rootDirectory}/assets/graphs/${changes.name}`,
   *  nodes: changes.nodes,
   *  edges: changes.edges,
   * })
   * ```
   */
  update(graphId: string, changes: Partial<Graph>, options: GraphOptions) {
    return of({
      id: graphId,
      location: `${options.rootDirectory}/assets/graphs/${changes.name}`,
      name: changes.name,
      nodes: changes.nodes,
      edges: changes.edges,
    });
  }

  /**
   * Mock version of the rename method from IGraphService.
   *
   * @param graphId Identifier of the graph to rename.
   * @param name New name for the graph.
   * @param options Options that allow customization of the method's behavior.
   * @returns
   * ```typescript
   * of({
   *  id: graphId,
   *  name,
   *  location: `${options.rootDirectory}/assets/graphs/${name}`,
   *  nodes: [],
   *  edges: [],
   * })
   * ```
   */
  rename(graphId: string, name: string, options: GraphOptions) {
    return of({
      id: graphId,
      location: `${options.rootDirectory}/assets/graphs/${name}`,
      name: name,
      nodes: [],
      edges: [],
    });
  }
}
