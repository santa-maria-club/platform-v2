import { Test, TestingModule } from '@nestjs/testing';

import { GraphController } from './graph.controller';
import { GRAPH_SERVICE } from './graph.service';
import { GraphServiceMock } from './graph.service.mock';

describe('GraphController', () => {
  let controller: GraphController;
  let graphService: GraphServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphController],
      providers: [
        {
          provide: GRAPH_SERVICE,
          useClass: GraphServiceMock,
        },
      ],
    }).compile();

    controller = module.get<GraphController>(GraphController);
    graphService = module.get<GraphServiceMock>(GRAPH_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Method', () => {
    it('should call create from graph service', () => {
      // arrange
      const createGraphDto = { name: 'test' };
      const options = { rootDirectory: __dirname };
      const createSpy = jest.spyOn(graphService, 'create');
      // act
      controller.create(createGraphDto).subscribe();
      // assert
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith(createGraphDto, options);
    });
  });

  describe('List Method', () => {
    it('should call list from graph service', () => {
      // arrange
      const options = { rootDirectory: __dirname };
      const listSpy = jest.spyOn(graphService, 'list');
      // act
      controller.list().subscribe();
      // assert
      expect(listSpy).toHaveBeenCalled();
      expect(listSpy).toHaveBeenCalledWith(options);
    });
  });

  describe('Update Method', () => {
    it('should call update from graph service', () => {
      // arrange
      const graphId = '123';
      const changes = { nodes: [], edges: [] };
      const options = { rootDirectory: __dirname };
      const updateSpy = jest.spyOn(graphService, 'update');
      // act
      controller.update(graphId, changes).subscribe();
      // assert
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith(graphId, changes, options);
    });
  });

  describe('Rename Method', () => {
    it('should call rename from graph service', () => {
      // arrange
      const graphId = '123';
      const name = 'new-name';
      const options = { rootDirectory: __dirname };
      const renameSpy = jest.spyOn(graphService, 'rename');
      // act
      controller.rename(graphId, name).subscribe();
      // assert
      expect(renameSpy).toHaveBeenCalled();
      expect(renameSpy).toHaveBeenCalledWith(graphId, name, options);
    });
  });
});
