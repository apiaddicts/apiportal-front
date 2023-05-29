import emailConstants from '../constants/emailConstants';

const initialState = {
  contactEmail: {},
  contactEmailError: {},
  newsletterEmail: {},
  newsletterEmailError: {},
  sendingEmail: false,
};

// eslint-disable-next-line default-param-last
export default function emailReducer(state = initialState, action) {
  switch (action.type) {
    case emailConstants.SEND_CONTACT_EMAIL_REQUEST:
      return {
        ...state,
        sendingEmail: true,
      };
    case emailConstants.SEND_CONTACT_EMAIL_SUCCESS:
      return {
        ...state,
        contactEmail: action.payload,
        sendingEmail: false,
      };
    case emailConstants.SEND_CONTACT_EMAIL_FAILURE:
      return {
        ...state,
        contactEmailError: action.payload,
        sendingEmail: false,
      };
    default:
      return state;
  }
};
