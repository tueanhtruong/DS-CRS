import { v4 as uuidv4 } from 'uuid';
import { GridBuilderType } from './context';

export const makeAGridItem = (
  gridItem: Partial<GridBuilderType> = {},
): GridBuilderType => {
  return {
    id: uuidv4(),
    columns: 1,
    refNames: {},
    ...gridItem,
  };
};
