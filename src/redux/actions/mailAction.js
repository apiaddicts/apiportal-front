import mailConstants from '../constants/mailConstants';
import mailService from '../../services/mailService';

// eslint-disable-next-line import/prefer-default-export
export const sendContactMail = (values) => (dispatch) => {
  mailService.sendContactMail(values).then(
    (response) => {
      if (response.ok) {
        dispatch({
          type: mailConstants.GET_ALL_MAIL_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: mailConstants.GET_ALL_MAIL_FAILURE,
          payload: response,
        });
      }
    },
    (error) => {
      dispatch({
        type: mailConstants.GET_ALL_MAIL_FAILURE,
        payload: error.response,
      });
    },
  );
};
