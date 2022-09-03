import termConstants from '../constants/termConstants';

const initialState = {
  termPage: {},
  error: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function termReducer(state = initialState, action) {
  switch (action.type) {
    case termConstants.GET_ALL_TERM_SUCCESS:
      return {
        ...state,
        termPage: action.payload,
      };
    case termConstants.GET_ALL_TERM_FAILURE:
      return {
        ...state,
        termPage: action.payload,
      };
    default:
      return state;
  }
};
