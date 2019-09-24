// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import data from './data';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    data
  });
}
