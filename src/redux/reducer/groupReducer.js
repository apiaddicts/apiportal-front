import groupConstants from '../constants/groupConstants';

const initialState = {
  // LIST GROUPS
  listGroupsReq: false,
  listGroupsRes: {},
  listGroupsFail: {},

  // DELETE GROUP
  groupLoading: false,

  //GET GROUPS BY USER
  getGroupsUserReq: false,
  getGroupsUserRes: {},
  getGroupsUserFail: {},

  //DELETE GROUPS OF USER
  delGroupsUserReq: false,
  delGroupsUserRes: {},
  delGroupsUserFail: {},

  //DELETE GROUPS OF USER
  addGroupsUserReq: false,
  addGroupsUserRes: {},
  addGroupsUserFail: {},
};

export default function groupReducer(state = initialState, { type, payload } = {}) {
  switch (type) {

    case groupConstants.LIST_GROUPS_REQUEST:
      return {
        ...state,
        listGroupsReq: true,
      };

    case groupConstants.LIST_GROUPS_SUCCESS:
      return {
        ...state,
        listGroupsReq: false,
        listGroupsRes: payload,
      };

    case groupConstants.LIST_GROUPS_FAILURE:
      return {
        ...state,
        listGroupsReq: false,
        listGroupsFail: payload,
      };

    case groupConstants.GET_GROUPS_USER_REQUEST:
      return {
        ...state,
        getGroupsUserReq: true,
      };

    case groupConstants.GET_GROUPS_USER_SUCCESS:
      return {
        ...state,
        getGroupsUserReq: false,
        getGroupsUserRes: payload,
      };

    case groupConstants.GET_GROUPS_USER_FAILURE:
      return {
        ...state,
        getGroupsUserReq: false,
        getGroupsUserFail: payload,
      };

    case groupConstants.DELETE_GROUPS_USER_REQUEST:
      return {
        ...state,
        delGroupsUserReq: true,
      };

    case groupConstants.DELETE_GROUPS_USER_SUCCESS:
      return {
        ...state,
        delGroupsUserReq: false,
        delGroupsUserRes: payload,
      };

    case groupConstants.DELETE_GROUPS_USER_FAILURE:
      return {
        delGroupsUserReq: false,
        delGroupsUserFail: payload,
      };

    case groupConstants.ADD_GROUPS_USER_REQUEST:
      return {
        ...state,
        addGroupsUserReq: true,
      };

    case groupConstants.ADD_GROUPS_USER_SUCCESS:
      return {
        ...state,
        addGroupsUserReq: false,
        addGroupsUserRes: payload,
      };

    case groupConstants.ADD_GROUPS_USER_FAILURE:
      return {
        ...state,
        addGroupsUserReq: false,
        addGroupsUserFail: payload,
      };

    case groupConstants.DELETE_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
      };

    case groupConstants.DELETE_GROUP_FAILURE:
      return {
        ...state,
        groupLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
