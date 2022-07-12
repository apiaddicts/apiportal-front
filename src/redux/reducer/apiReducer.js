import apiConstants from '../constants/apiConstans';

const initialState = {
  name: 'Headline Ad',
  apiPage: {},
  error: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case apiConstants.GET_ALL_API_SUCCESS:
      return {
        ...state,
        apiPage: action.payload,
      };
    case apiConstants.GET_ALL_API_FAILURE:
      return {
        ...state,
        apiPage: action.payload,
      };
    default:
      return state;
  }
};
