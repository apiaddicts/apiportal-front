import homeConstants from '../constants/homeConstants';

const initialState = {
  name: 'Headline Ad',
  data: {},
  error: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function demoReducer(state = initialState, action) {
  switch (action.type) {
    case homeConstants.GET_ALL_HOME_SUCCESS:
      return {
        ...state,
        data: action.payload[0],
      };
    case homeConstants.GET_ALL_HOME_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
