// @flow
import { ACTIONS } from '../actions/data';
import type { Action } from './types';

const initState = {
}

export default function counter(state: any = initState, action: Action) {
  switch (action.type) {
    case ACTIONS.LOAD:
      state = action.payload; break;
    default:
      state = state;
  }

  console.log("Updating state", state, action)

  return state;
}
