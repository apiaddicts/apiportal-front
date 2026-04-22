import userCredentialConstants from '../constants/userCredentialConstants';
import userCredentialService from '../../services/userCredentialService';

export const getUserCredentials = (credId, token) => (dispatch) => {
  dispatch({ type: userCredentialConstants.GET_USER_CREDENTIALS_REQUEST });
  userCredentialService.getUserCredentials(credId, token).then(
    (response) => {
      dispatch({
        type: userCredentialConstants.GET_USER_CREDENTIALS_SUCCESS,
        payload: response?.data ?? [],
      });
    },
    (error) => {
      dispatch({
        type: userCredentialConstants.GET_USER_CREDENTIALS_FAILURE,
        payload: error,
      });
    },
  );
};

export const createUserCredential = (credData, token) => (dispatch) => {
  dispatch({ type: userCredentialConstants.CREATE_USER_CREDENTIAL_REQUEST });
  userCredentialService.createUserCredential(credData, token).then(
    (response) => {
      dispatch({
        type: userCredentialConstants.CREATE_USER_CREDENTIAL_SUCCESS,
        payload: response?.data ?? response,
      });
    },
    (error) => {
      dispatch({
        type: userCredentialConstants.CREATE_USER_CREDENTIAL_FAILURE,
        payload: error,
      });
    },
  );
};
