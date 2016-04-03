import axios from 'axios';

import { TWITTER_API_URL } from '../../constants/index';

const FETCH = 'clicks/FETCH';
const FETCH_SUCCESS = 'clicks/FETCH_SUCCESS';
const FETCH_FAIL = 'clicks/FETCH_FAIL';

/* Reducers */
const initialState = {
  loading: false,
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      console.log('Fetching clicks');
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_SUCCESS:
      console.log('Fetch clicks succeeded');
      // const data = action.result.data ? action.result.data : {};
      return {
        ...state,
        ...action.result,
        loading: false,
        loaded: true
      };
    case FETCH_FAIL:
      console.log('Fetch clicks failed');
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
export function fetchClicks() {
  const url = `${TWITTER_API_URL}/profile-list`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: () => axios.get(url)
  };
}
