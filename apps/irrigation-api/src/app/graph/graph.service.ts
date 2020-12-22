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

export const GRAPH_SERVICE = 'GRAPH_SERVICE';

export interface CreateGraphOptions {
  rootDirectory: string;
}

export interface IGraphService {
  create: (
    createGraphDto: CreateGraphDto,
    options: CreateGraphOptions,
  ) => Observable<Graph>;
  list: (options: CreateGraphOptions) => Observable<Graph[]>;
}

export class GraphServiceMock implements IGraphService {
  create(createGraphDto: CreateGraphDto, options: CreateGraphOptions) {
    return of({
      id: '123',
      name: createGraphDto.name,
      location: `${options.rootDirectory}/assets/graphs/${createGraphDto.name}.json`,
      nodes: [],
      edges: [],
    });
  }
  list(options: CreateGraphOptions) {
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
}

export class GraphService implements IGraphService {
  constructor(
    @Inject(SHARED_UTILS_FILE_MANAGER_SERVICE)
    private fileManagerService: ISharedUtilsFileManagerService,
  ) {}

  create(createGraphDto: CreateGraphDto, options: CreateGraphOptions) {
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

  list(options: CreateGraphOptions) {
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
}
