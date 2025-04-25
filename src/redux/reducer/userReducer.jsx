import userConstants from '../constants/userConstats';

const token = JSON.parse(sessionStorage.getItem('token'));

const initialState = token ? {
  // id: token?.userId?.id,
  token: token['accessToken'],
  apimToken: false,
  etag: '',
  loadingSignUp: false,
  signUpData: {},
  user: {},
  loadingUser: false,
  responseError: {},
  responseErrorLogin: {},
  responseRestoreError: {},
  responseRestoreResponse: {},
  responseResetSignup: {},
  responseResetPwd: {},
  responseResetPwdError: {},
  accountVerificationSent: false,
  accountVerified: false,
  accountVerifiedResponse: {},
  openModal: false,
  changePasswordRequest: false,
  changePasswordSuccess: {},
  changePasswordFailure: {},
  chnStatusRes: {},
} : {
  user: {},
  loadingUser: false,
  id: '',
  token: '',
  apimToken:false,
  etag: '',
  loadingSignUp: false,
  signUpData: {},
  responseError: {},
  responseErrorLogin: {},
  responseRestoreError: {},
  responseRestoreResponse: {},
  responseResetSignup: {},
  responseResetPwd: {},
  responseResetPwdError: {},
  accountVerificationSent: false,
  accountVerified: false,
  accountVerifiedResponse: {},
  openModal: false,
  changePasswordRequest: false,
  changePasswordSuccess: {},
  changePasswordFailure: {},
  updateProfileReq: false,
  updateProfileSucc: {},
  updateProfileFail: {},
  chnStatusRes: {},
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
    case userConstants.RESTORE_SIGNUP_REQUEST:
      return {
        ...state,
        loadingSignUp: true,
        responseRestoreError: {},
      };
    case userConstants.RESTORE_SIGNUP_SUCCESS:
      return {
        ...state,
        loadingSignUp: false,
        responseRestoreResponse: action.response,
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
        accountVerified: true,
      };
    case userConstants.CONFIRM_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountVerified: false,
        accountVerifiedResponse: action.response,
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
    // login user groups
    case userConstants.GET_USER_GROUPS_REQUEST:
      return {
        ...state,
        loadingUserGroups: true,
      };
    case userConstants.GET_USER_GROUPS_SUCCESS:
      return {
        ...state,
        userGroups: action.response,
        loadingUserGroups: false,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
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
        changePasswordSuccess: {},
        changePasswordFailure: {},
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

    case userConstants.UPDATE_USER_STATUS_REQUEST:
      return {
        ...state,
        loadingUser: true,
      };
    case userConstants.UPDATE_USER_STATUS_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        chnStatusRes: action.payload,
      };
    case userConstants.UPDATE_USER_STATUS_FAILURE:
      return {
        ...state,
        loadingUser: false,
        responseError: action.payload,
      };

    case userConstants.CHANGE_PASSWORD_LOGGED_REQUEST:
      return {
        ...state,
        changePasswordRequest: true,
        changePasswordSuccess: {},
        changePasswordFailure: {},
      };
    case userConstants.CHANGE_PASSWORD_LOGGED_SUCCESS:
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordSuccess: action.response,
        changePasswordFailure: {},
      };
    case userConstants.CHANGE_PASSWORD_LOGGED_FAILURE:
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordSuccess: {},
        changePasswordFailure: action.response,
      };
    case userConstants.CHANGE_PASSWORD_LOGGED_RESET:
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordSuccess: {},
        changePasswordFailure: {},
      };

    case userConstants.CONFIRM_PASSWORD_REQUEST:
      return {
        ...state,
        loadingSignUp: true,
      };

    case userConstants.CONFIRM_PASSWORD_SUCCESS:
      return {
        loadingSignUp: false,
        responseResetPwd: action.response,
      };

    case userConstants.CONFIRM_PASSWORD_FAILURE:
      return {
        loadingSignUp: false,
        responseResetPwdError: action.response,
      };

    case userConstants.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        updateProfileReq: true,
      };

    case userConstants.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileReq: false,
        updateProfileSucc: action.response,
      };

    case userConstants.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        updateProfileReq: false,
        updateProfileFail: action.response,
      };

    // case userConstants.LOGIN_APIM_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   }
    case userConstants.LOGIN_APIM_SUCCESS:
      return {
        ...state,
        apimToken: action.payload,
        loading: false
      }
    
    case userConstants.LOGIN_APIM_FAILURE:
      return {
        ...state,
        error: action.payload,
        apimToken: false
      }
    default:
      return state;
  }
}
