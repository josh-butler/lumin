import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import counter from './counter';
import info from './info';
import users from './users';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  users
});
