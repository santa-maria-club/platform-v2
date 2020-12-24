import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

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
      const graph = {
        id: '456',
        name: 'name-456',
        location: `${rootDirectory}/assets/graphs/name-456.json`,
        nodes: [{ id: '4567', kind: 'faucet', label: 'Faucet #1' }],
        edges: [],
      };
      const nodes = [];
      const edges = [];
      const expectedLocation = `${rootDirectory}/assets/graphs/name-456.json`;
      const writeFileSpy = jest.spyOn(fileManagerService, 'writeFile');
      const viewSpy = jest
        .spyOn(service, 'view')
        .mockImplementation(() => of(graph));
      // act
      service.update(graphId, nodes, edges, { rootDirectory }).subscribe();
      // assert
      expect(viewSpy).toHaveBeenCalled();
      expect(viewSpy).toHaveBeenCalledWith(graphId, { rootDirectory });
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(expectedLocation, {
        ...graph,
        nodes,
        edges,
      });
    });
  });

  describe('Rename Method', () => {
    it('should call rename with old and new location', () => {
      // arrange
      const graphId = '456';
      const rootDirectory = '/home';
      const newName = 'new';
      const graph = {
        id: '456',
        name: 'name-456',
        location: `${rootDirectory}/assets/graphs/name-456.json`,
        nodes: [{ id: '4567', kind: 'faucet', label: 'Faucet #1' }],
        edges: [],
      };
      const updatedGraph = {
        id: '456',
        name: newName,
        location: `${rootDirectory}/assets/graphs/${newName}.json`,
        nodes: [{ id: '4567', kind: 'faucet', label: 'Faucet #1' }],
        edges: [],
      };
      const oldLocation = `${rootDirectory}/assets/graphs/name-456.json`;
      const newLocation = `${rootDirectory}/assets/graphs/${newName}.json`;
      const renameSpy = jest.spyOn(fileManagerService, 'rename');
      const writeFileSpy = jest.spyOn(fileManagerService, 'writeFile');
      const viewSpy = jest
        .spyOn(service, 'view')
        .mockImplementation(() => of(graph));
      // act
      service.rename(graphId, newName, { rootDirectory }).subscribe();
      // assert
      expect(viewSpy).toHaveBeenCalled();
      expect(viewSpy).toHaveBeenCalledWith(graphId, { rootDirectory });
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(oldLocation, updatedGraph);
      expect(renameSpy).toHaveBeenCalled();
      expect(renameSpy).toHaveBeenCalledWith(oldLocation, newLocation);
    });
  });
});
