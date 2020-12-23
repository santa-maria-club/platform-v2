import { Test, TestingModule } from '@nestjs/testing';

import {
  SharedUtilsFileManagerServiceMock,
  SHARED_UTILS_FILE_MANAGER_SERVICE,
} from '@platform/shared/utils/file-manager';
import type { ISharedUtilsFileManagerService } from '@platform/shared/utils/file-manager';
import { GraphService, GRAPH_SERVICE } from './graph.service';
import type { IGraphService } from './graph.service';
import { of } from 'rxjs';

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

  describe('List Method', () => {
    it('should call readDirectory and then readFile for each file', () => {
      // arrange
      const readDirectorySpy = jest.spyOn(fileManagerService, 'readDirectory');
      const readFileSpy = jest.spyOn(fileManagerService, 'readFile');
      const rootDirectory = '/home';
      const directoryLocation = `${rootDirectory}/assets/graphs`;
      // act
      service.list({ rootDirectory }).subscribe();
      // assert
      expect(readDirectorySpy).toHaveBeenCalled();
      expect(readDirectorySpy).toHaveBeenCalledWith(directoryLocation);
      expect(readFileSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Update Method', () => {
    it('should call write file for the respective graph', () => {
      // arrange
      const graphId = '456';
      const rootDirectory = '/home';
      const graphs = [
        {
          id: '123',
          name: 'name-123',
          location: `${rootDirectory}/assets/graphs/name-123.json`,
          nodes: [],
          edges: [],
        },
        {
          id: '456',
          name: 'name-456',
          location: `${rootDirectory}/assets/graphs/name-456.json`,
          nodes: [{ id: '4567', kind: 'faucet', label: 'Faucet #1' }],
          edges: [],
        },
      ];
      const graph = graphs.find((graph) => graph.id === graphId);
      const nodes = [];
      const edges = [];
      const expectedLocation = `${rootDirectory}/assets/graphs/name-456.json`;
      const writeFileSpy = jest.spyOn(fileManagerService, 'writeFile');
      const listSpy = jest
        .spyOn(service, 'list')
        .mockImplementation(() => of(graphs));
      // act
      service.update(graphId, nodes, edges, { rootDirectory }).subscribe();
      // assert
      expect(listSpy).toHaveBeenCalled();
      expect(listSpy).toHaveBeenCalledWith({ rootDirectory });
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(expectedLocation, {
        ...graph,
        nodes,
        edges,
      });
    });
  });
});
