import authConstants from '../constants/authConstants';
import authService from '../../services/authService';

export const register = (userData) => async (dispatch) => {
  dispatch({ type: authConstants.REGISTER_REQUEST });

  try {
    const response = await authService.register(userData);

    if (response?.error) {
      throw response.error;
    }

    dispatch({
      type: authConstants.REGISTER_SUCCESS,
      response,
    });

    return { success: true, response };
  } catch (error) {
    dispatch({
      type: authConstants.REGISTER_FAILURE,
      error,
    });

    return { error };
  }
};

export const forgotPassword = (email) => (dispatch) => {
  dispatch({ type: authConstants.FORGOT_PASSWORD_REQUEST });

  authService.forgotPassword(email).then(
    (response) => {
      dispatch({
        type: authConstants.FORGOT_PASSWORD_SUCCESS,
        response,
      });
    },
    (error) => {
      dispatch({
        type: authConstants.FORGOT_PASSWORD_FAILURE,
        error,
      });
    },
  );
};

export const resetPassword = (code, password, passwordConfirmation) => async (dispatch) => {
    dispatch({ type: authConstants.RESET_PASSWORD_REQUEST });

    try {
      const response = await authService.resetPassword(
        code,
        password,
        passwordConfirmation
      );

      if (response?.error) {
        throw response.error;
      }

      dispatch({
        type: authConstants.RESET_PASSWORD_SUCCESS,
        response,
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: authConstants.RESET_PASSWORD_FAILURE,
        error,
      });

      return { error };
    }
  };

export const login = (identifier, password) => async (dispatch) => {
  dispatch({ type: authConstants.LOGIN_REQUEST });

  try {
    const response = await authService.login(identifier, password);

    if (response?.error) {
      throw response.error;
    }

    const tokenObj = {
      accessToken: response.jwt,
      expiresIn: Date.now() + 3600 * 1000,
    };
    localStorage.setItem('token', JSON.stringify(tokenObj));
    localStorage.setItem('user', JSON.stringify(response.user));

    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      response,
    });

    return response;
  } catch (error) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      error,
    });

    throw error;
  }
};


export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  dispatch({ type: authConstants.LOGOUT });
};

export const resetAuthState = () => ({
  type: authConstants.AUTH_RESET_STATE,
});