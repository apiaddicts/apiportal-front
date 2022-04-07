import faqConstants from '../constants/faqConstants';
import faqService from '../../services/faqService';

// eslint-disable-next-line import/prefer-default-export
export const getFaq = () => (dispatch) => {
  faqService.getFaq().then(
    (response) => {
      dispatch({
        type: faqConstants.GET_ALL_FAQ_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: faqConstants.GET_ALL_FAQ_FAILURE,
        payload: error,
      });
    },
  );
};
