/* eslint-disable no-use-before-define */
import userConstants from '../constants/userConstats';
import userService from '../../services/userService';
import config from '../../services/config';
import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const login = (data) => (dispatch) => {
  dispatch({ type: userConstants.LOGIN_REQUEST });
  userService.login(data.email, data.password).then((response) => {
    if (response && Object.keys(response).length > 0) {
      if (Object.prototype.hasOwnProperty.call(response, 'error')) {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          error: response,
        });
      } else {
        if (data.remember) {
          const passwordEncrypted = btoa(data.password);
          const secureKeyEncrypted = btoa(`${passwordEncrypted}:${config.rememberkey}`);
          localStorage.setItem('email', data.email);
          localStorage.setItem('password', secureKeyEncrypted);
        }
        sessionStorage.setItem('token', JSON.stringify(response));
        dispatch(getUser(response));
        dispatch(getUserEntityTag(response));
        dispatch({ type: userConstants.RESET_ALERT });
      }
    }
  }, (error) => {
    console.error('error', error);
  });

};

export const confirmAccount = (queryParams, setIsOpen) => (dispatch) => {
  dispatch({
    type: userConstants.CONFIRM_ACCOUNT_REQUEST,
  });
  userService.confirmAccount(queryParams).then(
    (response) => {
      if (response.status === 204) {
        sessionStorage.setItem('token', JSON.stringify(response));
        dispatch(getUser(response));
        dispatch(getUserEntityTag(response));
        dispatch({
          type: userConstants.CONFIRM_ACCOUNT_SUCCESS,
        });
        setTimeout(() => { window.location = '/developer/profile'; }, 1500);
      } else {
        dispatch({
          type: userConstants.CONFIRM_ACCOUNT_FAILURE,
          error: response,
        });
        dispatch(logout());
        window.location = '/';
      }
    },
    (error) => {
      console.error('Confirm account error', error);
    },
  );
};

export const logout = () => (dispatch) => {
  window.location.reload(false);
  sessionStorage.removeItem('token');
  localStorage.removeItem('If-Match');
  dispatch({
    type: userConstants.LOGOUT_USER,
  });
};

export const signUp = (data) => (dispatch) => {
  dispatch({ type: userConstants.SIGNUP_REQUEST });
  userService.signUp(data).then(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: userConstants.SIGNUP_FAILURE,
            response,
          });
        } else {
          dispatch({
            type: userConstants.SIGNUP_SUCCESS,
            response,
          });
        }
      }
    },
    (error) => {
      console.error(error);
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
        sessionStorage.removeItem('token');
        localStorage.removeItem('If-Match');
        dispatch({ type: userConstants.LOGOUT_USER });
      }
    },
    (error) => {
      console.error(error);
    },
  );
};

export const getUserEntityTag = (tokens) => (dispatch) => {
  userService.getUserEntityTag(tokens.token, tokens.id).then(
    (response) => {
      localStorage.setItem('If-Match', JSON.stringify(response));
      dispatch({ type: userConstants.HEAD_ETAG_SUCCESS, response });
    },
    (error) => {
      console.error(error);
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
      console.error(error);
    },
  );
};
export const verifyOldPassword = (data) => (dispatch) => {
  userService.verifyOldPassword(data).then(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          if (response?.error?.status === 401) {
            dispatch({
              type: userConstants.RESTORE_SIGNUP_FAILURE,
              response,
            });
          }
        } else {
          dispatch(getUserEntityTag(response));
          dispatch(changePassword(data.new_password));
        }
      }
    },
    (error) => {
      console.error(error);
    },
  );
};
export const changePassword = (newPassword) => (dispatch) => {
  userService.changePassword(newPassword).then(
    (response) => {
      const passwordEncrypted = btoa(newPassword);
      const secureKeyEncrypted = btoa(`${passwordEncrypted}:${config.rememberkey}`);
      localStorage.setItem('password', secureKeyEncrypted);
      // dispatch(logout());
    },
    (error) => {
      console.error('Update password error', error);
    },
  );
};
export const resetPassword = (data) => (dispatch) => {
  userService.resetPassword(data).then(
    (response) => {
      if (response.status === 204) {
        dispatch({
          type: userConstants.RESET_SIGNUP,
          response,
        });
      }
    },
    (error) => {
      console.error('Update password error', error);
    },
  );
};
export const resetPasswordWithTicket = (queryParams, data, password) => (dispatch) => {
  userService.resetPasswordWithTicket(queryParams, data, password).then(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          if (response?.error?.status === 401) {
            dispatch({ type: userConstants.RESET_PASSWORD_TICKET_FAILURE, response });
          }
        } else {
          dispatch({ type: userConstants.RESET_PASSWORD_TICKET_SUCCESS, response });
          dispatch(logout());
          setTimeout(() => {
            console.error('redireccionar');
            window.location = '/';
          }, 1500);
        }
      }
    },
    (error) => {
      console.error('Reset password error', error);
    },
  );
};

export const sessionTimeout = () => (dispatch) => {
  dispatch({
    type: userConstants.SESSION_TIMEOUT,
  });
};

export const resetAlert = () => (dispatch) => {
  dispatch({ type: userConstants.RESET_ALERT });
};
