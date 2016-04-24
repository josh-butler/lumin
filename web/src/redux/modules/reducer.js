import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import requests from './requests';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  requests
});
