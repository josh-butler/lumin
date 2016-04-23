import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import clicks from './clicks';
import requests from './requests';
import query from './query';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  clicks,
  query,
  requests
});
