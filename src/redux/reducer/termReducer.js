import termConstants from '../constants/termConstants';

const initialState = {
  termPage: {},
  error: {},
  loading: false,

  legalReq: false,
  legalRes: {},
  legalFail: {},
};

// eslint-disable-next-line default-param-last
export default function termReducer(state = initialState, action) {
  switch (action.type) {
    case termConstants.GET_ALL_TERM_SUCCESS:
      return {
        ...state,
        termPage: action.payload,
      };
    case termConstants.GET_ALL_TERM_FAILURE:
      return {
        ...state,
        termPage: action.payload,
      };

    case termConstants.GET_ALL_LEGAL_NOTICE_REQUEST:
      return {
        ...state,
        legalReq: true,
      };

    case termConstants.GET_ALL_LEGAL_NOTICE_SUCCESS:
      return {
        ...state,
        legalReq: false,
        legalRes: action.payload,
      };

    case termConstants.GET_ALL_LEGAL_NOTICE_FAILURE:
      return {
        ...state,
        legalReq: false,
        legalFail: action.payload,
      };

    default:
      return state;
  }
};
