import userConstants from '../constants/userConstats';

const token = JSON.parse(localStorage.getItem('token'));
const etag = JSON.parse(localStorage.getItem('If-Match'));

const initialState = token && etag ? {
  id: token.id,
  token: token.token,
  etag: etag.etag,
  loadingSignUp: false,
  signUpData: {},
  user: {},
  loadingUser: false,
  responseError: {},
  responseErrorLogin: {},
  responseRestoreError: {},
  responseResetSignup: {},
  responseResetPwd: {},
  responseResetPwdError: {},
  accountVerificationSent: false,
  accountVerified: false,
  openModal: false,
} : {
  user: {},
  loadingUser: false,
  id: '',
  token: '',
  etag: '',
  loadingSignUp: false,
  signUpData: {},
  responseError: {},
  responseErrorLogin: {},
  responseRestoreError: {},
  responseResetSignup: {},
  responseResetPwd: {},
  responseResetPwdError: {},
  accountVerificationSent: false,
  accountVerified: false,
  openModal: false,
};

// eslint-disable-next-line default-param-last
export default function userReducer(state = initialState, action) {
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
        responseError: action.response,
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
    case userConstants.CONFIRM_ACCOUNT_REQUEST:
      return {
        ...state,
        accountVerificationSent: true,
      };
    case userConstants.CONFIRM_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountVerified: true,
      };
    case userConstants.CONFIRM_ACCOUNT_FAILURE:
      return {
        ...state,
        accountVerified: false,
        error: action.error,
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
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loadingSignUp: false,
        responseErrorLogin: action.error,
      };
    // save entity tag
    case userConstants.HEAD_ETAG_SUCCESS:
      return {
        ...state,
        etag: action.response.etag,
      };
    case userConstants.RESET_PASSWORD_TICKET_SUCCESS:
      return {
        ...state,
        loadingSignUp: false,
        responseResetPwd: action.response,
      };
    case userConstants.RESET_PASSWORD_TICKET_FAILURE:
      return {
        ...state,
        loadingSignUp: false,
        responseResetPwdError: action.response,
      };
    // logout
    case userConstants.RESET_ALERT:
      return {
        ...state,
        responseError: {},
        responseErrorLogin: {},
        responseRestoreError: {},
        responseResetSignup: {},
        ResponseResetPwd: {},
        responseResetPwdError: {},
        signUpData: {},
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
        ResponseResetPwd: {},
        responseResetPwdError: {},
        openModal: false,
      };
    case userConstants.SESSION_TIMEOUT:
      return {
        ...state,
        openModal: true,
      };
    default:
      return state;
  }
}
