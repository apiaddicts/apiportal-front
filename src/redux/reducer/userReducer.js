import userConstants from '../constants/userConstats';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {
  password: user.password,
  email: user.email,
} : {
  password: '',
  email: '',
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
    default:
      return state;
  }
}
