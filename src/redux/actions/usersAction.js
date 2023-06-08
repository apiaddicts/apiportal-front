import usersConstants from '../constants/usersConstants';
import usersService from '../../services/usersService';
import config from '../../services/config';

//import { logout } from './userAction';
import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const listUsers = (top, skip, filter) => (dispatch) => {
  dispatch({ type: usersConstants.GET_USERS_REQUEST });

  usersService.listUsers(top, skip, filter).then(
    (response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
          dispatch({
            type: usersConstants.GET_USERS_FAILURE,
            response,
          });
        } else {
          dispatch({
            type: usersConstants.GET_USERS_SUCCESS,
            response: response.data,
          });
        }
      }
    },
  );
};

export const getUserDetail = (name) => (dispatch) => {

  dispatch({ type: usersConstants.GET_USER_DETAIL_REQUEST });
  usersService.getUserDetail(name).then((response) => {
    if (Object.keys(response).length > 0) {
      if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
        dispatch({
          type: usersConstants.GET_USER_DETAIL_FAILURE,
          response,
        });
      } else {
        dispatch({
          type: usersConstants.GET_USER_DETAIL_SUCCESS,
          response: response.data,
        });
      }
    }
  });
};

/*export const updateUser = (data, userId) => (dispatch) => {
  usersService.updateUser(data, userId).then(
    (response) => {
      if (Object.keys(response).length > 0) {
        const { id, token } = store.getState().user;
        const tokens = {
          token,
          id,
        };
        dispatch(getUser(tokens));
      }
    },
    (error) => {
      console.error(error);
    },
  );
};*/

export const getUsersNext = (search) => (dispatch) => {
  const { usersSkip } = store.getState().users;
  const skip = parseInt(usersSkip, 10) + parseInt(config.topUser, 10);

  dispatch(listUsers(config.topUser, skip, search));
  dispatch({ type: usersConstants.GET_USERS_SKIP, skip });
};

export const getUsersPrevious = (search) => (dispatch) => {
  const { usersSkip } = store.getState().users;
  const skip = parseInt(usersSkip, 10) - parseInt(config.topUser, 10);

  dispatch(listUsers(config.topUser, skip, search));
  dispatch({ type: usersConstants.GET_USERS_SKIP, skip });
};

export const resetUsers = () => (dispatch) => {
  dispatch({
    type: usersConstants.RESET_USERS,
  });
};

export const filterUsersByName = (search, top = config.topUser, skip = 0) => (dispatch) => {
  usersService.filterUsersByName(search, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: usersConstants.GET_USERS_FAILURE,
            response,
          });
        } else {
          dispatch({
            type: usersConstants.GET_USERS_SUCCESS,
            response: response.data,
          });
          dispatch({ type: usersConstants.GET_USERS_SKIP, skip });
        }
      }
    });
};

export const filterUsersByEmail = (search, top = config.topUser, skip = 0) => (dispatch) => {
  usersService.filterUsersByEmail(search, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: usersConstants.GET_USERS_FAILURE,
            response,
          });
        } else {
          dispatch({
            type: usersConstants.GET_USERS_SUCCESS,
            response: response.data,
          });
          dispatch({ type: usersConstants.GET_USERS_SKIP, skip });
        }
      }
    });
};

