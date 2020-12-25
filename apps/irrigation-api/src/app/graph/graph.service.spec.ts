import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import {
  SharedUtilsFileManagerServiceMock,
  SHARED_UTILS_FILE_MANAGER_SERVICE,
} from '@platform/shared/utils/file-manager';
import { GraphService, GRAPH_SERVICE } from './graph.service';
import type { IGraphService } from './graph.service';

describe('GraphService', () => {
  let service: IGraphService;
  let fileManagerService: SharedUtilsFileManagerServiceMock;

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
    fileManagerService = module.get<SharedUtilsFileManagerServiceMock>(
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
      const options = { rootDirectory: '/home' };
      const expectedLocation = `${options.rootDirectory}/assets/graphs/${name}.json`;
      const expectedGraph = {
        id: '',
        edges: [],
        location: expectedLocation,
        name,
        nodes: [],
      };
      const writeFileSpy = jest.spyOn(fileManagerService, 'writeFile');
      // act
      service
        .create(createGraphDto, options)
        .subscribe((createdGraph) => (expectedGraph.id = createdGraph.id));
      // assert
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(
        expectedLocation,
        expectedGraph,
      );
    });
  });

  describe('List Method', () => {
    it('should call readDirectory and then readFile for each file', () => {
      // arrange
      const options = { rootDirectory: '/home' };
      const expectedLocation = `${options.rootDirectory}/assets/graphs`;
      const readDirectorySpy = jest.spyOn(fileManagerService, 'readDirectory');
      const readFileSpy = jest.spyOn(fileManagerService, 'readFile');
      // act
      service.list(options).subscribe();
      // assert
      expect(readDirectorySpy).toHaveBeenCalled();
      expect(readDirectorySpy).toHaveBeenCalledWith(expectedLocation);
      expect(readFileSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Update Method', () => {
    it('should call write file for the respective graph', () => {
      // arrange
      const graphId = '456';
      const options = { rootDirectory: '/home' };
      const graph = {
        id: '456',
        name: 'name-456',
        location: `${options.rootDirectory}/assets/graphs/name-456.json`,
        nodes: [{ id: '4567', kind: 'faucet', label: 'Faucet #1' }],
        edges: [],
      };
      const changes = { nodes: [], edges: [] };
      const expectedLocation = `${options.rootDirectory}/assets/graphs/name-456.json`;
      const writeFileSpy = jest.spyOn(fileManagerService, 'writeFile');
      const viewSpy = jest
        .spyOn(service, 'view')
        .mockImplementation(() => of(graph));
      // act
      service.update(graphId, changes, options).subscribe();
      // assert
      expect(viewSpy).toHaveBeenCalled();
      expect(viewSpy).toHaveBeenCalledWith(graphId, options);
      expect(writeFileSpy).toHaveBeenCalled();
      expect(writeFileSpy).toHaveBeenCalledWith(expectedLocation, {
        ...graph,
        ...changes,
      });
    });
  });

  describe('Rename Method', () => {
    it('should call rename with old and new location', () => {
      // arrange
      const graphId = '456';
      const rootDirectory = '/home';
      const name = 'new';
      const graph = {
        id: '456',
        name: 'name-456',
        location: `${rootDirectory}/assets/graphs/name-456.json`,
        nodes: [{ id: '4567', kind: 'faucet', label: 'Faucet #1' }],
        edges: [],
      };
      const updatedGraph = {
        id: '456',
        name,
        location: `${rootDirectory}/assets/graphs/${name}.json`,
        nodes: [{ id: '4567', kind: 'faucet', label: 'Faucet #1' }],
        edges: [],
      };
      const changes = {
        name,
        location: `${rootDirectory}/assets/graphs/${name}.json`,
      };
      const oldLocation = `${rootDirectory}/assets/graphs/name-456.json`;
      const newLocation = `${rootDirectory}/assets/graphs/${name}.json`;
      const renameSpy = jest.spyOn(fileManagerService, 'rename');
      const viewSpy = jest
        .spyOn(service, 'view')
        .mockImplementation(() => of(graph));
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockImplementation(() => of(updatedGraph));
      // act
      service.rename(graphId, name, { rootDirectory }).subscribe();
      // assert
      expect(viewSpy).toHaveBeenCalled();
      expect(viewSpy).toHaveBeenCalledWith(graphId, { rootDirectory });
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith(graphId, changes, {
        rootDirectory,
      });
      expect(renameSpy).toHaveBeenCalled();
      expect(renameSpy).toHaveBeenCalledWith(oldLocation, newLocation);
    });
  });

  describe('Delete Method', () => {
    it('should call delete file for the respective graph', () => {
      // arrange
      const graphId = '456';
      const options = { rootDirectory: '/home' };
      const expectedLocation = `${options.rootDirectory}/assets/graphs/name-456.json`;
      const graph = {
        id: graphId,
        name: 'name-456',
        location: expectedLocation,
        nodes: [{ id: '4567', kind: 'faucet', label: 'Faucet #1' }],
        edges: [],
      };
      const deleteFileSpy = jest.spyOn(fileManagerService, 'deleteFile');
      const viewSpy = jest
        .spyOn(service, 'view')
        .mockImplementation(() => of(graph));
      // act
      service.delete(graphId, options).subscribe();
      // assert
      expect(viewSpy).toHaveBeenCalled();
      expect(viewSpy).toHaveBeenCalledWith(graphId, options);
      expect(deleteFileSpy).toHaveBeenCalled();
      expect(deleteFileSpy).toHaveBeenCalledWith(expectedLocation);
    });
  });
});
