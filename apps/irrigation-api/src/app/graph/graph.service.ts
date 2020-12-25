import { Inject } from '@nestjs/common';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import type {
  CreateGraphDto,
  Graph,
} from '@platform/shared/utils/irrigation-api-interfaces';
import { createGraphFromCreateGraphDto } from '@platform/shared/utils/irrigation-creators';
import type { ISharedUtilsFileManagerService } from '@platform/shared/utils/file-manager';
import { SHARED_UTILS_FILE_MANAGER_SERVICE } from '@platform/shared/utils/file-manager';

/**
 * Graph Service Token used For Dependency Injection purposes.
 */
export const GRAPH_SERVICE = 'GRAPH_SERVICE';

/**
 * Graph Service Token used For Dependency Injection purposes.
 */
export interface GraphOptions {
  rootDirectory: string;
}

/**
 * Manage all the graph related methods.
 */
export interface IGraphService {
  /**
   * Creates a new graph.
   *
   * @param createGraphDto Partial version of the graph prior to it's creation.
   * @param options Options that allow customization of the method's behavior.
   * @returns An observable that emits the newly created graph.
   */
  create(
    createGraphDto: CreateGraphDto,
    options: GraphOptions,
  ): Observable<Graph>;

  /**
   * Retrieves all the stored graphs.
   *
   * @param options An options object
   * @returns An observable that emits the all the graphs.
   */
  list(options: GraphOptions): Observable<Graph[]>;

  /**
   * Retrieve a graph based on a graphId.
   *
   * @param graphId The identifier of the graph that's going to be retrieved.
   * @param options An options object
   * @returns An observable that emits the requested graph.
   */
  view(graphId: string, options: GraphOptions): Observable<Graph>;

  /**
   * Change a set of fields from a graph.
   *
   * @param graphId The identifier of the graph that's going to be updated.
   * @param changes A Partial version of the graph with the fields to update.
   * @param options An options object
   * @returns An observable that emits the updated graph
   * with the given nodes and edges.
   */
  update(
    graphId: string,
    changes: Partial<Graph>,
    options: GraphOptions,
  ): Observable<Graph>;

  /**
   * Rename a given graph.
   *
   * @param graphId The identifier of the graph that's going to be renamed.
   * @param name A string used for the new name of the graph.
   * @param options An options object
   * @returns An observable that emits the renamed graph.
   */
  rename(
    graphId: string,
    name: string,
    options: GraphOptions,
  ): Observable<Graph>;
}

/** Concrete implementation of the IGraphService */
export class GraphService implements IGraphService {
  constructor(
    @Inject(SHARED_UTILS_FILE_MANAGER_SERVICE)
    private fileManagerService: ISharedUtilsFileManagerService,
  ) {}

  /** @inheritDoc */
  create(
    createGraphDto: CreateGraphDto,
    options: GraphOptions,
  ): Observable<Graph> {
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

  /** @inheritDoc */
  list(options: GraphOptions): Observable<Graph[]> {
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

  /** @inheritDoc */
  view(graphId: string, options: GraphOptions): Observable<Graph> {
    return this.list(options).pipe(
      map((graphs) =>
        graphs
          .filter((graph) => graph.id === graphId)
          .reduce((_, curr) => curr),
      ),
    );
  }

  /** @inheritDoc */
  update(
    graphId: string,
    changes: Partial<Graph>,
    options: GraphOptions,
  ): Observable<Graph> {
    return this.view(graphId, options).pipe(
      mergeMap((graph) => {
        const updatedGraph = { ...graph, ...changes };
        return this.fileManagerService
          .writeFile(graph.location, updatedGraph)
          .pipe(map(() => updatedGraph));
      }),
    );
  }

  /** @inheritDoc */
  rename(
    graphId: string,
    name: string,
    options: GraphOptions,
  ): Observable<Graph> {
    return combineLatest([
      this.view(graphId, options),
      this.update(
        graphId,
        {
          name,
          location: `${options.rootDirectory}/assets/graphs/${name}.json`,
        },
        options,
      ),
    ]).pipe(
      mergeMap(([oldGraph, newGraph]) =>
        this.fileManagerService
          .rename(oldGraph.location, newGraph.location)
          .pipe(map(() => newGraph)),
      ),
    );
  }
}
