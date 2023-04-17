import gettingStartedService from '../../services/gettingStartedService';
import gettingStartedConstants from '../constants/gettingStartedConstants';

const gettingStarted = () => (dispatch) => {
  dispatch({
    type: gettingStartedConstants.GET_GETTING_STARTED_REQUEST,
  });
  gettingStartedService.gettingStarted()
    .then((response) => {
      dispatch({
        type: gettingStartedConstants.GET_GETTING_STARTED_SUCCESS,
        payload: response,
      });
    }, (error) => {
      dispatch({
        type: gettingStartedConstants.GET_GETTING_STARTED_ERROR,
        payload: error.message,
      });
    });
};

const gettingStartedAction = {
  gettingStarted,
};

export default gettingStartedAction;
