import faqConstants from '../constants/faqConstants';

const initialState = {
  dataFaq: {},
  error: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function faqReducer(state = initialState, action) {
  switch (action.type) {
    case faqConstants.GET_ALL_FAQ_SUCCESS:
      return {
        ...state,
        dataFaq: action.payload[0],
        error: {},
      };
    case faqConstants.GET_ALL_FAQ_FAILURE:
      return {
        ...state,
        dataFaq: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
