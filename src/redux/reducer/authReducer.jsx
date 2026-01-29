import authConstants from '../constants/authConstants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case authConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };

    case authConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };

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

    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        token: action.response.jwt,
        user: action.response.user,
        error: null,
      };

    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };

    case authConstants.LOGOUT:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
        token: null,
        user: null,
      };

    default:
      return state;
  }
}
