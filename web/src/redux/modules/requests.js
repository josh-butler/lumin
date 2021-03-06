import axios from 'axios';

import { REQUEST_API_URL } from '../../constants/index';

const FETCH = 'requests/FETCH';
const FETCH_SUCCESS = 'requests/FETCH_SUCCESS';
const FETCH_FAIL = 'requests/FETCH_FAIL';
const POST = 'requests/POST';
const POST_SUCCESS = 'requests/POST_SUCCESS';
const POST_FAIL = 'requests/POST_FAIL';

/* Reducers */
const initialState = {
  loading: false,
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.result,
        loading: false,
        loaded: true
      };
    case FETCH_FAIL:
      console.log('Fetch failed');
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case POST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case POST_FAIL:
      console.log('POST failed');
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
}

/* Actions */
export function fetchRequests(clientId) {
  const url = `${REQUEST_API_URL}/request-q/${clientId}`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: () => axios.get(url)
  };
}

export function postRequest(request) {
  const url = `${REQUEST_API_URL}/feature-request`;
  return {
    types: [POST, POST_SUCCESS, POST_FAIL],
    promise: () => axios.post(url, {data: request})
  };
}
