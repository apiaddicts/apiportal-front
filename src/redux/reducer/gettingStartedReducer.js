import gettingStartedConstants from '../constants/gettingStartedConstants';

const initialState = {
  data: [],
  gettingLoading: false,
  error: '',
};

export default function gettingStartedReducer(state = initialState, { type, payload } = {}) {
  switch (type) {

    case gettingStartedConstants.GET_GETTING_STARTED_REQUEST:
      return {
        ...state,
        gettingLoading: true,
      };

    case gettingStartedConstants.GET_GETTING_STARTED_SUCCESS:
      return {
        ...state,
        gettingLoading: false,
        data: payload,
      };

    case gettingStartedConstants.GET_GETTING_STARTED_ERROR:
      return {
        ...state,
        gettingLoading: false,
        error: payload,
      };

    default:
      return state;
  }
}
