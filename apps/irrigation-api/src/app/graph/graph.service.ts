import { Inject } from '@nestjs/common';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import type {
  CreateGraphDto,
  Edge,
  Graph,
  Node,
} from '@platform/shared/utils/irrigation-api-interfaces';
import { createGraphFromCreateGraphDto } from '@platform/shared/utils/irrigation-creators';
import type { ISharedUtilsFileManagerService } from '@platform/shared/utils/file-manager';
import { SHARED_UTILS_FILE_MANAGER_SERVICE } from '@platform/shared/utils/file-manager';

export const GRAPH_SERVICE = 'GRAPH_SERVICE';

export interface GraphOptions {
  rootDirectory: string;
}

export interface IGraphService {
  create: (
    createGraphDto: CreateGraphDto,
    options: GraphOptions,
  ) => Observable<Graph>;
  list: (options: GraphOptions) => Observable<Graph[]>;
  view: (graphId: string, options: GraphOptions) => Observable<Graph>;
  update: (
    graphId: string,
    nodes: Node[],
    edges: Edge[],
    options: GraphOptions,
  ) => Observable<Graph>;
  rename: (
    oldName: string,
    newName: string,
    options: GraphOptions,
  ) => Observable<Graph>;
}

export class GraphServiceMock implements IGraphService {
  create(createGraphDto: CreateGraphDto, options: GraphOptions) {
    return of({
      id: '123',
      name: createGraphDto.name,
      location: `${options.rootDirectory}/assets/graphs/${createGraphDto.name}.json`,
      nodes: [],
      edges: [],
    });
  }
  list(options: GraphOptions) {
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
  view(graphId: string, options: GraphOptions) {
    return of({
      id: graphId,
      name: 'name-123',
      location: `${options.rootDirectory}/assets/graphs/name-123.json`,
      nodes: [],
      edges: [],
    });
  }
  update(graphId: string, nodes: Node[], edges: Edge[], options: GraphOptions) {
    return of({
      id: graphId,
      name: 'name-123',
      location: `${options.rootDirectory}/assets/graphs/name-123.json`,
      nodes,
      edges,
    });
  }
  rename() {
    return of(null);
  }
}

export class GraphService implements IGraphService {
  constructor(
    @Inject(SHARED_UTILS_FILE_MANAGER_SERVICE)
    private fileManagerService: ISharedUtilsFileManagerService,
  ) {}

  create(createGraphDto: CreateGraphDto, options: GraphOptions) {
    return of(
      createGraphFromCreateGraphDto(createGraphDto, {
        location: `${options.rootDirectory}/assets/graphs/${createGraphDto.name}.json`,
      }),
    ).pipe(
      mergeMap((graph) =>
        this.fileManagerService
          .writeFile(graph.location, graph)
          .pipe(map(() => graph)),
      ),
    );
  }

  list(options: GraphOptions) {
    return this.fileManagerService
      .readDirectory(`${options.rootDirectory}/assets/graphs`)
      .pipe(
        mergeMap((files) =>
          combineLatest(
            files.map((file) =>
              this.fileManagerService
                .readFile(`${options.rootDirectory}/assets/graphs/${file}`)
                .pipe(map((file) => file as Graph)),
            ),
          ),
        ),
      );
  }

  view(graphId: string, options: GraphOptions) {
    return this.list(options).pipe(
      map((graphs) =>
        graphs
          .filter((graph) => graph.id === graphId)
          .reduce((_, curr) => curr),
      ),
    );
  }

  update(graphId: string, nodes: Node[], edges: Edge[], options: GraphOptions) {
    return this.view(graphId, options).pipe(
      mergeMap((graph) => {
        const updatedGraph = { ...graph, nodes, edges };
        return this.fileManagerService
          .writeFile(graph.location, updatedGraph)
          .pipe(map(() => updatedGraph));
      }),
    );
  }

  rename(graphId: string, newName: string, options: GraphOptions) {
    const newLocation = `${options.rootDirectory}/assets/graphs/${newName}.json`;
    return this.view(graphId, options).pipe(
      mergeMap((graph) =>
        this.fileManagerService
          .rename(graph.location, newLocation)
          .pipe(map(() => graph)),
      ),
      mergeMap((graph) => {
        const updatedGraph = {
          ...graph,
          name: newName,
          location: newLocation,
        };
        return this.fileManagerService
          .writeFile(newLocation, updatedGraph)
          .pipe(map(() => updatedGraph));
      }),
    );
  }
}
