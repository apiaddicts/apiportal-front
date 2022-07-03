import homeConstants from '../constants/homeConstants';
import homeService from '../../services/homeService';

// eslint-disable-next-line import/prefer-default-export
export const getHomeContent = () => (dispatch) => {
  homeService.getHomeContent().then(
    (response) => {
      dispatch({
        type: homeConstants.GET_ALL_HOME_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: homeConstants.GET_ALL_HOME_FAILURE,
        payload: error,
      });
    },
  );
};
