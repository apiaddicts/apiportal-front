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

export const getUserCredential = (documentId, token) => (dispatch) => {
  dispatch({ type: userCredentialConstants.GET_USER_CREDENTIAL_REQUEST });
  userCredentialService.getUserCredential(documentId, token).then(
    (response) => {
      dispatch({
        type: userCredentialConstants.GET_USER_CREDENTIAL_SUCCESS,
        payload: response?.data ?? null,
      });
    },
    (error) => {
      dispatch({
        type: userCredentialConstants.GET_USER_CREDENTIAL_FAILURE,
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

export const addProductsToCredential = (documentId, products, apimConfigDocumentId, token) => (dispatch) => {
  dispatch({ type: userCredentialConstants.ADD_PRODUCTS_REQUEST });
  userCredentialService.addProductsToCredential(documentId, products, apimConfigDocumentId, token).then(
    (response) => {
      dispatch({
        type: userCredentialConstants.ADD_PRODUCTS_SUCCESS,
        payload: response?.data ?? response,
      });
    },
    (error) => {
      dispatch({ type: userCredentialConstants.ADD_PRODUCTS_FAILURE, payload: error?.message || String(error) });
    },
  );
};

export const resetAddProducts = () => (dispatch) => {
  dispatch({ type: userCredentialConstants.RESET_ADD_PRODUCTS });
};
