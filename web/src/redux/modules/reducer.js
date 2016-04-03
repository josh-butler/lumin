import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import clicks from './clicks';
import counter from './counter';
import info from './info';
import users from './users';
import query from './query';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  clicks,
  info,
  query,
  users
});
