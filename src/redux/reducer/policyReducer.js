import policyConstants from '../constants/policyConstants';

const initialState = {
  policyPage: {},
  error: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function policyReducer(state = initialState, action) {
  switch (action.type) {
    case policyConstants.GET_ALL_POLICY_SUCCESS:
      return {
        ...state,
        policyPage: action.payload,
      };
    case policyConstants.GET_ALL_POLICY_FAILURE:
      return {
        ...state,
        policyPage: action.payload,
      };
    default:
      return state;
  }
};
