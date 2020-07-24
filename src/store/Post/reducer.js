const initialState = {
  posts: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_POSTS':
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
}
