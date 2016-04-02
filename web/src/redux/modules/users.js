import axios from 'axios';

import { TWITTER_API_URL } from '../../constants/index';

const FETCH = 'users/FETCH';
const FETCH_SUCCESS = 'users/FETCH_SUCCESS';
const FETCH_FAIL = 'users/FETCH_FAIL';

/* Reducers */
const initialState = {
  loading: false,
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      console.log('Fetching users');
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_SUCCESS:
      console.log('Fetch succeeded');
      // const data = action.result.data ? action.result.data : {};
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
    default:
      return state;
  }
}

/* Actions */
export function fetchUsers(query, page) {
  const url = `${TWITTER_API_URL}/search/${query}/${page}`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: () => axios.get(url)
  };
}
