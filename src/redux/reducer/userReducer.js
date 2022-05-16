import userConstants from '../constants/userConstats';

const token = JSON.parse(localStorage.getItem('token'));
const etag = JSON.parse(localStorage.getItem('etag'));

const initialState = token && etag ? {
  id: token.id,
  token: token.token,
  etag: etag.etag,
  loadinSignUp: false,
  signUpData: {},
  user: {},
} : {
  user: {},
  id: '',
  token: '',
  etag: '',
  loadingSignUp: false,
  signUpData: {},
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
    // login user
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.response,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        id: action.id,
        token: action.token,
      };
    // logout
    case userConstants.LOGOUT_USER:
      return {
        ...state,
        id: '',
        token: '',
        user: {},
      };
    default:
      return state;
  }
}
