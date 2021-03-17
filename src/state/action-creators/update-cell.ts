import { ActionType } from '../action-types';
import { UpdateCellAction } from '../actions';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};
