import { Test, TestingModule } from '@nestjs/testing';

import { GraphController } from './graph.controller';
import { GraphServiceMock, GRAPH_SERVICE } from './graph.service';
import type { IGraphService } from './graph.service';

describe('GraphController', () => {
  let controller: GraphController;
  let graphService: IGraphService;

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
    graphService = module.get<IGraphService>(GRAPH_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Method', () => {
    it('should call create from graph service', () => {
      // arrange
      const createGraphDto = { name: 'test' };
      const createSpy = jest.spyOn(graphService, 'create');
      const options = { rootDirectory: __dirname };
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
      const listSpy = jest.spyOn(graphService, 'list');
      const options = { rootDirectory: __dirname };
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
      const nodes = [];
      const edges = [];
      const updateSpy = jest.spyOn(graphService, 'update');
      const options = { rootDirectory: __dirname };
      // act
      controller.update(graphId, nodes, edges).subscribe();
      // assert
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith(graphId, nodes, edges, options);
    });
  });

  describe('Rename Method', () => {
    it('should call rename from graph service', () => {
      // arrange
      const graphId = '123';
      const newName = 'new-name';
      const renameSpy = jest.spyOn(graphService, 'rename');
      const options = { rootDirectory: __dirname };
      // act
      controller.rename(graphId, newName).subscribe();
      // assert
      expect(renameSpy).toHaveBeenCalled();
      expect(renameSpy).toHaveBeenCalledWith(graphId, newName, options);
    });
  });
});
