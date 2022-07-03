import homeConstants from '../constants/homeConstants';

const initialState = {
  name: 'Headline Ad',
  homePage: {},
  error: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case homeConstants.GET_ALL_HOME_SUCCESS:
      return {
        ...state,
        homePage: action.payload,
      };
    case homeConstants.GET_ALL_HOME_FAILURE:
      return {
        ...state,
        homePage: action.payload,
      };
    default:
      return state;
  }
};
