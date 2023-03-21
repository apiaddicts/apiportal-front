import appPartnersConstants from '../constants/appPartnersConstants';

const initialState = {
  appPartnersPage: {},
  error: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function appPartnersReducer(state = initialState, action) {
  switch (action.type) {
    case appPartnersConstants.GET_ALL_APP_PARTNERS_SUCCESS:
      return {
        ...state,
        appPartnersPage: action.payload,
      };
    case appPartnersConstants.GET_ALL_APP_PARTNERS_FAILURE:
      return {
        ...state,
        appPartnersPage: action.payload,
      };
    default:
      return state;
  }
};
