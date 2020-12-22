import { Test, TestingModule } from '@nestjs/testing';

import {
  SharedUtilsFileManagerServiceMock,
  SHARED_UTILS_FILE_MANAGER_SERVICE,
} from '@platform/shared/utils/file-manager';
import type { ISharedUtilsFileManagerService } from '@platform/shared/utils/file-manager';
import { GraphService, GRAPH_SERVICE } from './graph.service';
import type { IGraphService } from './graph.service';

describe('GraphService', () => {
  let service: IGraphService;
  let fileManagerService: ISharedUtilsFileManagerService;

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
    fileManagerService = module.get<ISharedUtilsFileManagerService>(
      SHARED_UTILS_FILE_MANAGER_SERVICE,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Method', () => {
    it('should call writeFile and send the location and graph', () => {
      // arrange
      const name = 'test';
      const createGraphDto = { name };
      const writeFileSpy = jest.spyOn(fileManagerService, 'writeFile');
      const rootDirectory = '/home';
      const location = `${rootDirectory}/assets/graphs/${name}.json`;
      const expectedGraph = {
        id: '',
        edges: [],
        location,
        name,
        nodes: [],
      };
      // act
      service
        .create(createGraphDto, { rootDirectory })
        .subscribe((createdGraph) => (expectedGraph.id = createdGraph.id));
      // assert
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(location, expectedGraph);
    });
  });
});
