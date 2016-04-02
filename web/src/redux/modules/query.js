const UPDATE = 'query/UPDATE';

const initialState = {
  query: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        query: action.payload
      };
    default:
      return state;
  }
}

export function updateQuery(query) {
  return {
    type: UPDATE,
    payload: query
  };
}
