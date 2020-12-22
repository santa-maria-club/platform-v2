import { Inject } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import type {
  CreateGraphDto,
  Graph,
} from '@platform/shared/utils/irrigation-api-interfaces';
import { createGraphFromCreateGraphDto } from '@platform/shared/utils/irrigation-creators';
import type { ISharedUtilsFileManagerService } from '@platform/shared/utils/file-manager';
import { SHARED_UTILS_FILE_MANAGER_SERVICE } from '@platform/shared/utils/file-manager';

export const GRAPH_SERVICE = 'GRAPH_SERVICE';

export interface IGraphService {
  create: (createGraphDto: CreateGraphDto) => Observable<Graph>;
}

export class GraphServiceMock implements IGraphService {
  create(createGraphDto: CreateGraphDto) {
    return of({
      id: '123',
      name: createGraphDto.name,
      location: 'location-123',
      nodes: [],
      edges: [],
    });
  }
}

export class GraphService implements IGraphService {
  constructor(
    @Inject(SHARED_UTILS_FILE_MANAGER_SERVICE)
    private fileManagerService: ISharedUtilsFileManagerService,
  ) {}

  create(createGraphDto: CreateGraphDto) {
    return of(
      createGraphFromCreateGraphDto(createGraphDto, {
        location: `${__dirname}/assets/graphs/${createGraphDto.name}.json`,
      }),
    ).pipe(
      mergeMap((graph) =>
        this.fileManagerService
          .writeFile(graph.location, graph)
          .pipe(map(() => graph)),
      ),
    );
  }
}
