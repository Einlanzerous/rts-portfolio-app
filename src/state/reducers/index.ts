import { combineReducers } from 'redux';
import { reducer as cellsReducer } from './cellsReducer';

export const reducers = combineReducers({
  cells: cellsReducer
});

export type RootState = ReturnType<typeof reducers>;
