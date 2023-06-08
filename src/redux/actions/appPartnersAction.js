import appPartnersConstants from '../constants/appPartnersConstants';
import appPartnersService from '../../services/appPartnersService';

// eslint-disable-next-line import/prefer-default-export
export const getAppPartnersContent = () => (dispatch) => {
  appPartnersService.getAppPartnersContent().then(
    (response) => {
      dispatch({
        type: appPartnersConstants.GET_ALL_APP_PARTNERS_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: appPartnersConstants.GET_ALL_APP_PARTNERS_FAILURE,
        payload: error,
      });
    },
  );
};
