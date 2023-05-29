import termConstants from '../constants/termConstants';
import termsService from '../../services/termsService';

// eslint-disable-next-line import/prefer-default-export
export const getTermsContent = () => (dispatch) => {
  termsService.getTermsContent().then(
    (response) => {
      dispatch({
        type: termConstants.GET_ALL_TERM_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: termConstants.GET_ALL_TERM_FAILURE,
        payload: error,
      });
    },
  );
};

export const getLegalNoticeContent = () => (dispatch) => {
  termsService.getLegalNoticeContent()
    .then((response) => {
      dispatch({
        type: termConstants.GET_ALL_LEGAL_NOTICE_SUCCESS,
        payload: response,
      });
    }, (error) => {
      dispatch({
        type: termConstants.GET_ALL_LEGAL_NOTICE_FAILURE,
        payload: error,
      });
    });
};
