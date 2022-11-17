import mailConstants from '../constants/mailConstants';
import mailService from '../../services/mailService';

// eslint-disable-next-line import/prefer-default-export
export const sendContactMail = (values) => (dispatch) => {
  dispatch({
    type: mailConstants.GET_ALL_MAIL_CONTACT_SUCCESS,
    payload: {},
  });
  /*mailService.sendContactMail(values).then(
    (response) => {
      if (response.ok) {
        dispatch({
          type: mailConstants.GET_ALL_MAIL_CONTACT_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: mailConstants.GET_ALL_MAIL_CONTACT_FAILURE,
          payload: response,
        });
      }
    },
    (error) => {
      dispatch({
        type: mailConstants.GET_ALL_MAIL_CONTACT_FAILURE,
        payload: error.response,
      });
    },
  );*/
};

export const sendConversationMail = (values) => (dispatch) => {
  dispatch({
    type: mailConstants.GET_ALL_MAIL_CONVERSATION_SUCCESS,
    payload: {},
  });
  /*mailService.sendConversationMail(values).then(
    (response) => {
      if (response.ok) {
        dispatch({
          type: mailConstants.GET_ALL_MAIL_CONVERSATION_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: mailConstants.GET_ALL_MAIL_CONVERSATION_FAILURE,
          payload: response,
        });
      }
    },
    (error) => {
      dispatch({
        type: mailConstants.GET_ALL_MAIL_CONVERSATION_FAILURE,
        payload: error.response,
      });
    },
  );*/
};
