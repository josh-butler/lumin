import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import clicks from './clicks';
import users from './users';
import query from './query';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  clicks,
  query,
  users
});
