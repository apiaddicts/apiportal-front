import emailConstants from '../constants/emailConstants';
import emailService from '../../services/emailService';

const sendContactEmail = (values) => (dispatch) => {
  dispatch({
    type: emailConstants.SEND_CONTACT_EMAIL_REQUEST,
  });
  emailService.sendContactEmail(values).then(
    (response) => {
      if (response.ok) {
        dispatch({
          type: emailConstants.SEND_CONTACT_EMAIL_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: emailConstants.SEND_CONTACT_EMAIL_FAILURE,
          payload: response,
        });
      }
    },
    (error) => {
      dispatch({
        type: emailConstants.SEND_CONTACT_EMAIL_FAILURE,
        payload: error.response,
      });
    },
  );
};

const emailAction = {
  sendContactEmail,
};

export default emailAction;
