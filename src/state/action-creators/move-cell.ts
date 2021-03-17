import { CellDirection } from '..';
import { ActionType } from '../action-types';
import { MoveCellAction } from '../actions';

export const moveCell = (
  id: string,
  direction: CellDirection
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  };
};
