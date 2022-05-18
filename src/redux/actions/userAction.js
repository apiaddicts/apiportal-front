/* eslint-disable no-use-before-define */
import userConstants from '../constants/userConstats';
import userService from '../../services/userService';

import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const login = (data) => (dispatch) => {
  dispatch({ type: userConstants.LOGIN_REQUEST });

  userService.login(data.email, data.password).then((response) => {
    if (response && Object.keys(response).length > 0) {
      localStorage.setItem('token', JSON.stringify(response));
      dispatch(getUser(response));
      dispatch(getUserEntityTag(data, response));
    }
  }, (error) => {
    console.error(error);
  });

};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('If-Match');
  dispatch({
    type: userConstants.LOGOUT_USER,
  });
};

export const signUp = (data) => (dispatch) => {
  dispatch({ type: userConstants.SIGNUP_REQUEST });
  userService.signUp(data).then(
    (response) => {
      dispatch({
        type: userConstants.SIGNUP_SUCCESS,
        response,
      });
    },
    (error) => {
      console.log(error);
    },
  );
};

export const getUser = (tokens) => (dispatch) => {
  dispatch({ type: userConstants.GET_USER_REQUEST });
  userService.getUserDetails(tokens.token, tokens.id).then(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        dispatch({ type: userConstants.GET_USER_SUCCESS, response });
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          id: tokens.id,
          token: tokens.token,
        });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('If-Match');
        dispatch({ type: userConstants.LOGOUT_USER });
      }
    },
    (error) => {
      console.log(error);
    },
  );
};

export const getUserEntityTag = (properties, tokens) => (dispatch) => {

  userService.getUserEntityTag(tokens.token, tokens.id).then(
    (response) => {
      localStorage.setItem('If-Match', JSON.stringify(response));
      dispatch({ type: userConstants.HEAD_ETAG_SUCCESS, response });
    },
    (error) => {
      console.log(error);
    },
  );
};

export const updateUser = (data) => (dispatch) => {
  userService.updateUser(data).then(
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
      console.log(error);
    },
  );
};
