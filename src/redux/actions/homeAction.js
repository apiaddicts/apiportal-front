import homeConstants from '../constants/homeConstants';
import homeService from '../../services/homeService';

// eslint-disable-next-line import/prefer-default-export
export const getHome = () => (dispatch) => {
  homeService.getHome().then(
    (response) => {
      dispatch({
        type: homeConstants.GET_ALL_HOME_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: userConstants.USER_SEND_RESET_PASSWORD_FAILURE,
        payload: error,
      });
    },
  );
};
