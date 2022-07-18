import apiConstants from '../constants/apiConstans';
import apiService from '../../services/apiService';

// eslint-disable-next-line import/prefer-default-export
export const getApiContent = () => (dispatch) => {
  apiService.getApiContent().then(
    (response) => {
      dispatch({
        type: apiConstants.GET_ALL_API_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: apiConstants.GET_ALL_API_FAILURE,
        payload: error,
      });
    },
  );
};
