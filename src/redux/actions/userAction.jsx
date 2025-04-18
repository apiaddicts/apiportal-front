/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import userConstants from '../constants/userConstats';
import userService from '../../services/userService';
import config from '../../services/config';
import { getUserDetail, listUsers } from './usersAction';
import subscriptionsService from '../../services/subscriptionsService';
import apiManagerService from '../../services/apiManagerService';

// eslint-disable-next-line import/prefer-default-export
export const login = (data) => (dispatch) => {
  dispatch({ type: userConstants.LOGIN_REQUEST });
  userService.login(data.username, data.password).then((response) => {
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
          localStorage.setItem('username', data.username);
          localStorage.setItem('password', secureKeyEncrypted);
        }
        const expirationTime = Date.now() + response['expiresIn'] * 1000;
        const token = {
          ...response,
          expiresIn: expirationTime,
          refreshExpiresIn: expirationTime
        }
        sessionStorage.setItem('token', JSON.stringify(token));
        dispatch(getUser(response['accessToken']));
        dispatch({ type: userConstants.RESET_ALERT });
      }
    }
  }, (error) => {
    console.error('error', error);
  });

};

export const loginApim = (configApim) => (dispatch) => {
  apiManagerService.integrationLogin(configApim)
   .then(response => {
     if(response.data['token']){
      localStorage.setItem('tokenApim',response.data['token']);
      dispatch({
        type: userConstants.LOGIN_APIM_SUCCESS,
        apimToken: response.data['token']
      })
     }else{
      dispatch({
        type: userConstants.LOGIN_APIM_FAILURE,
        error: response
      })
      sessionStorage.removeItem('token');
      localStorage.removeItem('tokenApim');
      dispatch({ type: userConstants.LOGOUT_USER });
     }
     // return response
   })
   .catch(error => {
     console.error(error);
    //  ocalStorage.removeItem('tokenApim');
    // dispatch({ type: userConstants.LOGOUT_USER });
   })
 }

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
  let dataResponse = {};
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
          dataResponse = response;
          dispatch({
            type: userConstants.SIGNUP_SUCCESS,
            response,
          });
          if (config.generateStarterSubscriptionOnSignup) {
            const { name } = dataResponse;
            const data = {
              properties: {
                name: 'starter',
                scope: '/products/starter',
                appType: 'developerPortal',
              },
            };
            subscriptionsService.subscribeToAProductWithHmac(data, name);
          }
        }
      }
    },
    (error) => {
      console.error(error);
    },
  );
};

export const getUser = (token) => (dispatch) => {
  dispatch({ type: userConstants.GET_USER_REQUEST });
  userService.getUserDetails(token).then(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        dispatch({ type: userConstants.GET_USER_SUCCESS, response });
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          token,
        });
      } else {
        sessionStorage.removeItem('token');
        dispatch({ type: userConstants.LOGOUT_USER });
      }
    },
    (error) => {
      console.error(error);
    },
  );
};

export const getUserGroups = (tokens) => (dispatch) => {
  dispatch({ type: userConstants.GET_USER_GROUPS_REQUEST });
  userService.getUserGroups(tokens?.token, tokens?.userId?.id).then(
    (response) => {
      dispatch({ type: userConstants.GET_USER_GROUPS_SUCCESS, response });
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

export const updateUser = (data, userId, tokens) => (dispatch) => {
  dispatch({
    type: userConstants.UPDATE_USER_PROFILE_REQUEST,
  });
  userService.updateUser(data, userId).then(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: userConstants.UPDATE_USER_PROFILE_FAILURE,
            response,
          });
        } else {
          dispatch({
            type: userConstants.UPDATE_USER_PROFILE_SUCCESS,
            response,
          });
        }
      }
    },
  ).finally(() => {
    dispatch(getUser(tokens));
  });
};

export const changeStatus = (data, userId) => (dispatch) => {
  dispatch({
    type: userConstants.UPDATE_USER_STATUS_REQUEST,
  });
  userService.changeStatus(data, userId)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
          dispatch({
            type: userConstants.UPDATE_USER_STATUS_FAILURE,
            payload: response,
          });
          dispatch(resetAlert());
        } else {
          dispatch({
            type: userConstants.UPDATE_USER_STATUS_SUCCESS,
            payload: response.data,
          });
        }
      }
    }).finally(() => {
      dispatch(getUserDetail(userId));
      dispatch(listUsers());
    });
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
      dispatch({
        type: userConstants.CHANGE_PASSWORD_LOGGED_SUCCESS,
        response,
      });
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

export const resetPasswordWithTicket = (queryParams, data) => (dispatch) => {
  userService.resetPasswordWithTicket(queryParams, data).then(
    (response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({ type: userConstants.RESET_PASSWORD_TICKET_FAILURE, response });
        } else {
          dispatch({ type: userConstants.RESET_PASSWORD_TICKET_SUCCESS, response });
        }
      }
    },
    (error) => {
      console.error('Reset password error', error);
    },
  );
};

export const confirmPassword = ({ confirmToken, newPassword }) => (dispatch) => {
  dispatch({
    type: userConstants.CONFIRM_PASSWORD_REQUEST,
  });
  userService.confirmPassword(confirmToken, newPassword)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: userConstants.CONFIRM_PASSWORD_FAILURE,
            response,
          });
        } else {
          dispatch({
            type: userConstants.CONFIRM_PASSWORD_SUCCESS,
            response,
          });
        }
      }
    });
};

export const sessionTimeout = () => (dispatch) => {
  dispatch({
    type: userConstants.SESSION_TIMEOUT,
  });
};

export const resetAlert = () => (dispatch) => {
  dispatch({ type: userConstants.RESET_ALERT });
};
