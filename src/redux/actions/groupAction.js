import config from '../../services/config';
import groupService from '../../services/groupService';
import groupConstants from '../constants/groupConstants';

const listGroups = (top = config.topGroups, skip = 0, filter = '') => (dispatch) => {
  dispatch({
    type: groupConstants.LIST_GROUPS_REQUEST,
  });
  groupService.listGroups(top, skip, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.LIST_GROUPS_FAILURE,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.LIST_GROUPS_SUCCESS,
            payload: response,
          });
        }
      }
    });
};

const getGroupsByUser = (userId, top = config.topGroups, skip = 0) => (dispatch) => {
  dispatch({
    type: groupConstants.GET_GROUPS_USER_REQUEST,
  });
  groupService.getGroupsByUser(userId, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
          dispatch({
            type: groupConstants.GET_GROUPS_USER_FAILURE,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.GET_GROUPS_USER_SUCCESS,
            payload: response,
          });
        }
      }
    });
};

const addGroupOfUser = (data) => (dispatch) => {
  const { userId, groupId } = data;
  dispatch({
    type: groupConstants.ADD_GROUPS_USER_REQUEST,
  });
  if (groupId && Object.keys(groupId).length > 0) {
    for (let i = 0; i < groupId.length; i++) {
      const { value } = groupId[i];
      const params = {
        userId,
        groupId: value,
      };
      groupService.addGroupOfUser(params)
        .then((response) => {
          if (response && Object.keys(response).length > 0) {
            if (Object.prototype.hasOwnProperty.call(response, 'error')) {
              dispatch({
                type: groupConstants.ADD_GROUPS_USER_FAILURE,
                payload: response,
              });
            } else {
              dispatch({
                type: groupConstants.ADD_GROUPS_USER_SUCCESS,
                payload: response.data,
              });
            }
          }
        })
        .finally(() => dispatch(getGroupsByUser(userId)));
    }
  }
};

const deleteGroupOfUser = (data) => (dispatch) => {
  const { userId } = data;
  dispatch({
    type: groupConstants.DELETE_GROUPS_USER_REQUEST,
  });
  groupService.deleteGroupOfUser(data)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.DELETE_GROUPS_USER_FAILURE,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.DELETE_GROUPS_USER_SUCCESS,
            payload: response.data,
          });
        }
      }
    })
    .finally(() => dispatch(getGroupsByUser(userId)));
};

const deleteGroup = (id) => (dispatch) => {
  dispatch({
    type: groupConstants.DELETE_GROUP_REQUEST,
  });
  groupService.deleteGroup(id)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.DELETE_GROUP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.DELETE_GROUP_SUCCESS,
            payload: response.data,
          });
        }
      }
    }).finally(() => {
      dispatch(listGroups());
    });
};

const groupAction = {
  listGroups,
  deleteGroup,
  getGroupsByUser,
  deleteGroupOfUser,
  addGroupOfUser,
};

export default groupAction;
