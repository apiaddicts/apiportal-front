import userCredentialConstants from '../constants/userCredentialConstants';

const initialState = {
  credentials: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

export default function userCredentialReducer(state = initialState, action) {
  switch (action.type) {
    case userCredentialConstants.GET_USER_CREDENTIALS_REQUEST:
      return { ...state, loading: true, error: null };
    case userCredentialConstants.GET_USER_CREDENTIALS_SUCCESS:
      return { ...state, loading: false, credentials: action.payload };
    case userCredentialConstants.GET_USER_CREDENTIALS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case userCredentialConstants.CREATE_USER_CREDENTIAL_REQUEST:
      return { ...state, createLoading: true, createError: null };
    case userCredentialConstants.CREATE_USER_CREDENTIAL_SUCCESS:
      return {
        ...state,
        createLoading: false,
        credentials: [action.payload, ...state.credentials],
      };
    case userCredentialConstants.CREATE_USER_CREDENTIAL_FAILURE:
      return { ...state, createLoading: false, createError: action.payload };

    default:
      return state;
  }
}
