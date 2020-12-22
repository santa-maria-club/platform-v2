import { Test, TestingModule } from '@nestjs/testing';

import {
  SharedUtilsFileManagerServiceMock,
  SHARED_UTILS_FILE_MANAGER_SERVICE,
} from '@platform/shared/utils/file-manager';
import { GraphService, GRAPH_SERVICE } from './graph.service';
import type { IGraphService } from './graph.service';

describe('GraphService', () => {
  let service: IGraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: GRAPH_SERVICE, useClass: GraphService },
        {
          provide: SHARED_UTILS_FILE_MANAGER_SERVICE,
          useClass: SharedUtilsFileManagerServiceMock,
        },
      ],
    }).compile();

    service = module.get<IGraphService>(GRAPH_SERVICE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
