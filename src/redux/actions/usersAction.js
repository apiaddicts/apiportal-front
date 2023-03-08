import usersService from '../../services/usersService';
import usersConstants from '../constants/usersConstants';

const listUsers = (top, skip, filter) => (dispatch) => {
  dispatch({
    type: usersConstants.LIST_USERS_REQUEST,
  });
  usersService.listUsers(top, skip, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
          dispatch({
            type: usersConstants.LIST_USERS_FAILURE,
            payload: response,
          });
        } else {
          dispatch({
            type: usersConstants.LIST_USERS_SUCCESS,
            payload: response.data,
          });
        }
      }
    });
};

const getUsersDetail = (userId) => (dispatch) => {
  dispatch({
    type: usersConstants.GET_USERS_DETAIL_REQUEST,
  });
  usersService.getUsersDetail(userId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: usersConstants.GET_USERS_DETAIL_FAILURE,
            payload: response,
          });
        } else {
          dispatch({
            type: usersConstants.GET_USERS_DETAIL_SUCCESS,
            payload: response,
          });
        }
      }
    });
};

const userChangeStatus = (data, userId) => (dispatch) => {
  dispatch({
    type: usersConstants.UPDATE_USERS_STATUS_REQUEST,
  });
  usersService.userChangeStatus(data, userId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: usersConstants.UPDATE_USERS_STATUS_FAILURE,
            payload: response,
          });
        } else {
          dispatch({
            type: usersConstants.UPDATE_USERS_STATUS_SUCCESS,
            payload: response,
          });
        }
      }
    });
};

const usersAction = {
  listUsers,
  getUsersDetail,
  userChangeStatus,
};

export default usersAction;
