import usersConstants from '../constants/usersConstants';

const initialState = {

  // LIST USERS
  listUsersReq: false,
  listUsersRes: {},
  listUsersFail: {},

  // USERS DETAILS
  usersDetailReq: false,
  usersDetailRes: {},
  usersDetailFail: {},

  // CHANGE STATUS
  changeStatusReq: false,
  changeStatusRes: {},
  changeStatusFail: {},

};

export default function usersReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case usersConstants.LIST_USERS_REQUEST:
      return {
        ...state,
        listUsersReq: true,
      };

    case usersConstants.LIST_USERS_SUCCESS:
      return {
        ...state,
        listUsersReq: false,
        listUsersRes: payload,
      };

    case usersConstants.LIST_USERS_FAILURE:
      return {
        ...state,
        listUsersReq: false,
        listUsersFail: payload,
      };

    case usersConstants.GET_USERS_DETAIL_REQUEST:
      return {
        ...state,
        usersDetailReq: true,
      };

    case usersConstants.GET_USERS_DETAIL_SUCCESS:
      return {
        ...state,
        usersDetailReq: false,
        usersDetailRes: payload,
      };

    case usersConstants.GET_USERS_DETAIL_FAILURE:
      return {
        ...state,
        usersDetailReq: false,
        usersDetailFail: payload,
      };

    case usersConstants.UPDATE_USERS_STATUS_REQUEST:
      return {
        ...state,
        changeStatusReq: true,
      };

    case usersConstants.UPDATE_USERS_STATUS_SUCCESS:
      return {
        ...state,
        changeStatusReq: false,
        changeStatusRes: payload,
      };

    case usersConstants.UPDATE_USERS_STATUS_FAILURE:
      return {
        ...state,
        changeStatusReq: false,
        changeStatusFail: payload,
      };

    default:
      return state;
  }
}
