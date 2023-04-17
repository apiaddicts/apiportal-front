import usersConstants from '../constants/usersConstants';

const initialState = {
  // users
  users: {},
  error: {},
  spinner: false,
  usersSkip: 0,
  // user
  userDetail: {},
  errorUser: {},
  spinnerUser: false,
};

// eslint-disable-next-line default-param-last
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    // Cases to bring the users
    case usersConstants.GET_USERS_REQUEST:
      return {
        ...state,
        spinner: true,
      };
    case usersConstants.GET_USERS_SUCCESS:
      return {
        ...state,
        spinner: false,
        users: action.response,
        error: {},
      };
    case usersConstants.GET_USERS_FAILURE:
      return {
        ...state,
        spinner: false,
        users: [],
        error: action.response,
      };
    // Case to bring the next user
    case usersConstants.GET_USERS_SKIP:
      return {
        ...state,
        usersSkip: parseInt(action.skip, 10),
      };
      // Cases to bring the user
    case usersConstants.GET_USER_DETAIL_REQUEST:
      return {
        ...state,
        spinnerUser: true,
      };
    case usersConstants.GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        spinnerUser: false,
        userDetail: action.response,
        errorUser: {},
      };
    case usersConstants.GET_USER_DETAIL_FAILURE:
      return {
        ...state,
        spinnerUser: false,
        userDetail: {},
        errorUser: action.response,
      };

    case usersConstants.RESET_USERS:
      return {
        ...state,
        usersSkip: 0,
      };

    default:
      return state;
  }
}
