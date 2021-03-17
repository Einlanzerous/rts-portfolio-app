import { combineReducers } from 'redux';
import { reducer as cellsReducer } from './cellsReducer';
import { reducer as bundlesReducer } from './bundlesReducer';

export const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer
});

export type RootState = ReturnType<typeof reducers>;
