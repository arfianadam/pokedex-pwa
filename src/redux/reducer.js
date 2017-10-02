import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import pokemon from './modules/pokemon';
import search from './modules/search';
import type from './modules/type';

export default function createReducers(asyncReducers) {
  return {
    routing: routerReducer,
    reduxAsyncConnect,
    online: (v = true) => v,
    form,
    pokemon,
    search,
    type,
    ...asyncReducers
  };
}
