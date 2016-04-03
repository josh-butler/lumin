import axios from 'axios';

import { PER_PAGE, TWITTER_API_URL } from '../../constants/index';

const FETCH = 'users/FETCH';
const FETCH_SUCCESS = 'users/FETCH_SUCCESS';
const FETCH_FAIL = 'users/FETCH_FAIL';
const POST = 'users/POST';
const POST_SUCCESS = 'users/POST_SUCCESS';
const POST_FAIL = 'users/POST_FAIL';

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
    case POST:
      console.log('POSTing users');
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case POST_SUCCESS:
      console.log('POST succeeded');
      // const data = action.result.data ? action.result.data : {};
      return {
        ...state,
        posted: [...action.result],
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
export function fetchUsers(query, page) {
  const url = `${TWITTER_API_URL}/search/${query}/${PER_PAGE}/${page}`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: () => axios.get(url)
  };
}

export function postUser(user) {
  const url = `${TWITTER_API_URL}/increment/${user.id_str}`;
  return {
    types: [POST, POST_SUCCESS, POST_FAIL],
    promise: () => axios.post(url, {data: user})
  };
}
