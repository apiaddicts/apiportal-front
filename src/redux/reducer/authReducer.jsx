import authConstants from '../constants/authConstants';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.FORGOT_PASSWORD_REQUEST:
    case authConstants.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case authConstants.FORGOT_PASSWORD_SUCCESS:
    case authConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };

    case authConstants.FORGOT_PASSWORD_FAILURE:
    case authConstants.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };

    case authConstants.AUTH_RESET_STATE:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
      };

    default:
      return state;
  }
}
