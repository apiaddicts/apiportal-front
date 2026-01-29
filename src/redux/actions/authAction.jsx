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

export const resetAuthState = () => ({
  type: authConstants.AUTH_RESET_STATE,
});