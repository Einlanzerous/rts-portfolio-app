import { Dispatch } from 'react';
import { bundleEsbuild } from '../../bundler';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const createBundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id
      }
    });

    const result = await bundleEsbuild(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle: result
      }
    })
  };
};
