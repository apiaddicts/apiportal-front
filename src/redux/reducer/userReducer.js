import userConstants from '../constants/userConstats';

const token = JSON.parse(localStorage.getItem('token'));
const etag = JSON.parse(localStorage.getItem('If-Match'));

const initialState = token && etag ? {
  id: token.id,
  token: token.token,
  etag: etag.etag,
  loadinSignUp: false,
  signUpData: {},
  user: {},
  loadingUser: false,
  responseError: {},
  responseRestoreError: {},
  responseResetSignup: {},
} : {
  user: {},
  loadingUser: false,
  id: '',
  token: '',
  etag: '',
  loadingSignUp: false,
  signUpData: {},
  responseError: {},
  responseRestoreError: {},
  responseResetSignup: {},
};

// eslint-disable-next-line default-param-last
export default function userReducer(state = initialState, action) {
  console.log('action', action);
  switch (action.type) {
    // save user in local storage
    case userConstants.SAVE_USER:
      return {
        ...state,
        password: action.password,
        email: action.email,
      };
    // sign up user
    case userConstants.SIGNUP_REQUEST:
      return {
        ...state,
        loadingSignUp: true,
        signUpData: {},
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        loadingSignUp: false,
        signUpData: action.response,
      };
    case userConstants.SIGNUP_FAILURE:
      return {
        ...state,
        loadingSignUp: false,
        responseError: action.error,
      };
    case userConstants.RESTORE_SIGNUP_FAILURE:
      return {
        ...state,
        loadingSignUp: false,
        responseRestoreError: action.response,
      };
    case userConstants.RESET_SIGNUP:
      return {
        ...state,
        loadingSignUp: false,
        responseResetSignup: action.response,
      };
    // login user
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        loadingUser: true,
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.response,
        loadingUser: false,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        id: action.id,
        token: action.token,
      };
    // save entity tag
    case userConstants.HEAD_ETAG_SUCCESS:
      return {
        ...state,
        etag: action.response.etag,
      };
      // logout
    case userConstants.RESET_ALERT:
      console.log('entro al reset alert');
      return {
        ...state,
        responseError: {},
        responseRestoreError: {},
        responseResetSignup: {},
      };
    case userConstants.LOGOUT_USER:
      return {
        ...state,
        id: '',
        token: '',
        etag: '',
        user: {},
        signUpData: {},
        responseError: {},
        responseRestoreError: {},
        responseResetSignup: {},
      };
    default:
      return state;
  }
}
