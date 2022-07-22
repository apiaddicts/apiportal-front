import mailConstants from '../constants/mailConstants';

const initialState = {
  name: 'Headline Ad',
  mailContactError: {},
  mailContact: {},
  mailConversationError: {},
  mailConversation: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function mailReducer(state = initialState, action) {
  switch (action.type) {
    case mailConstants.GET_ALL_MAIL_CONTACT_SUCCESS:
      return {
        ...state,
        mailContact: action.payload,
      };
    case mailConstants.GET_ALL_MAIL_CONTACT_FAILURE:
      return {
        ...state,
        mailContactError: action.payload,
      };
    case mailConstants.GET_ALL_MAIL_CONVERSATION_SUCCESS:
      return {
        ...state,
        mailConversation: action.payload,
      };
    case mailConstants.GET_ALL_MAIL_CONVERSATION_FAILURE:
      return {
        ...state,
        mailConversationtError: action.payload,
      };
    default:
      return state;
  }
};
