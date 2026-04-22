import apimConstants from '../constants/apimConstants';
import apimService from '../../services/apimService';

export const getApimConfigs = () => (dispatch) => {
  dispatch({ type: apimConstants.GET_APIM_CONFIGS_REQUEST });
  apimService.getApimConfigs().then(
    (response) => {
      dispatch({
        type: apimConstants.GET_APIM_CONFIGS_SUCCESS,
        payload: response?.data ?? [],
      });
    },
    (error) => {
      dispatch({
        type: apimConstants.GET_APIM_CONFIGS_FAILURE,
        payload: error,
      });
    },
  );
};

export const generateCredentials = (apimConfigDocumentId, credId, services, token) => (dispatch) => {
  dispatch({ type: apimConstants.GENERATE_CREDENTIALS_REQUEST });
  apimService.generateCredentials(apimConfigDocumentId, credId, services, token).then(
    (response) => {
      const credData = response?.data?.data ?? response?.data;
      if (credData) {
        dispatch({
          type: apimConstants.GENERATE_CREDENTIALS_SUCCESS,
          payload: credData,
        });
      } else {
        dispatch({
          type: apimConstants.GENERATE_CREDENTIALS_FAILURE,
          payload: response?.error?.message || 'Error generating credentials',
        });
      }
    },
    (error) => {
      dispatch({ type: apimConstants.GENERATE_CREDENTIALS_FAILURE, payload: error?.message || String(error) });
    },
  );
};

export const resetGeneratedCredentials = () => (dispatch) => {
  dispatch({ type: apimConstants.RESET_GENERATED_CREDENTIALS });
};

export const addServices = (apimConfigDocumentId, consumerId, services, token) => (dispatch) => {
  dispatch({ type: apimConstants.ADD_SERVICES_REQUEST });
  apimService.addServices(apimConfigDocumentId, consumerId, services, token).then(
    (response) => {
      dispatch({
        type: apimConstants.ADD_SERVICES_SUCCESS,
        payload: response?.data ?? response,
      });
    },
    (error) => {
      dispatch({ type: apimConstants.ADD_SERVICES_FAILURE, payload: error });
    },
  );
};
