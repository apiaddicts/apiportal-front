import userCredentialConstants from '../constants/userCredentialConstants';

const initialState = {
  credentials: [],
  loading: false,
  error: null,

  currentCredential: null,
  currentCredentialLoading: false,
  currentCredentialError: null,

  createLoading: false,
  createError: null,

  addProductsLoading: false,
  addProductsError: null,
  addProductsSuccess: false,
};

export default function userCredentialReducer(state = initialState, action) {
  switch (action.type) {
    case userCredentialConstants.GET_USER_CREDENTIALS_REQUEST:
      return { ...state, loading: true, error: null };
    case userCredentialConstants.GET_USER_CREDENTIALS_SUCCESS:
      return { ...state, loading: false, credentials: action.payload };
    case userCredentialConstants.GET_USER_CREDENTIALS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case userCredentialConstants.GET_USER_CREDENTIAL_REQUEST:
      return { ...state, currentCredentialLoading: true, currentCredentialError: null };
    case userCredentialConstants.GET_USER_CREDENTIAL_SUCCESS:
      return { ...state, currentCredentialLoading: false, currentCredential: action.payload };
    case userCredentialConstants.GET_USER_CREDENTIAL_FAILURE:
      return { ...state, currentCredentialLoading: false, currentCredentialError: action.payload };

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

    case userCredentialConstants.ADD_PRODUCTS_REQUEST:
      return { ...state, addProductsLoading: true, addProductsError: null, addProductsSuccess: false };
    case userCredentialConstants.ADD_PRODUCTS_SUCCESS:
      return {
        ...state,
        addProductsLoading: false,
        addProductsSuccess: true,
        currentCredential: action.payload ?? state.currentCredential,
      };
    case userCredentialConstants.ADD_PRODUCTS_FAILURE:
      return { ...state, addProductsLoading: false, addProductsError: action.payload };
    case userCredentialConstants.RESET_ADD_PRODUCTS:
      return { ...state, addProductsLoading: false, addProductsError: null, addProductsSuccess: false };

    default:
      return state;
  }
}
