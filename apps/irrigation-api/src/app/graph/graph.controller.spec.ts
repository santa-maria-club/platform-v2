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
});
