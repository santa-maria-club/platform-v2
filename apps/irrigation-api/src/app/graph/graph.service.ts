import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import type { CreateGraphDto } from '@platform/shared/utils/irrigation-api-interfaces';
import { createGraphFromCreateGraphDto } from '@platform/shared/utils/irrigation-creators';
import { SharedUtilsFileManagerService } from '@platform/shared/utils/file-manager';

@Injectable()
export class GraphService {
  constructor(private fileManagerService: SharedUtilsFileManagerService) {}

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
