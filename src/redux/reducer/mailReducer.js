import mailConstants from '../constants/mailConstants';

const initialState = {
  name: 'Headline Ad',
  error: {},
  mailContact: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function mailReducer(state = initialState, action) {
  switch (action.type) {
    case mailConstants.GET_ALL_MAIL_SUCCESS:
      return {
        ...state,
        mailContact: action.payload,
      };
    case mailConstants.GET_ALL_MAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
