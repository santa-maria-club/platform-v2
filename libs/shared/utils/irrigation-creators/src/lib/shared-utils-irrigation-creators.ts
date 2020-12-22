import { v4 as uuid } from 'uuid';
import {
  CreateGraphDto,
  Graph,
} from '@platform/shared/utils/irrigation-api-interfaces';

export interface CreateGraphOptions {
  location: string;
}

export const createGraphFromCreateGraphDto = (
  createGraphDto: CreateGraphDto,
  options: CreateGraphOptions,
): Graph => ({
  id: uuid() || '',
  name: createGraphDto.name || '',
  location: options.location,
  nodes: [],
  edges: [],
});
