import apimConstants from '../constants/apimConstants';

const initialState = {
  apimConfigs: [],
  apimConfigsLoading: false,
  apimConfigsError: null,

  generatedCredentials: null,
  generateCredentialsLoading: false,
  generateCredentialsError: null,

  addServicesLoading: false,
  addServicesError: null,
};

// eslint-disable-next-line default-param-last
export default function apimReducer(state = initialState, action) {
  switch (action.type) {
    case apimConstants.GET_APIM_CONFIGS_REQUEST:
      return { ...state, apimConfigsLoading: true, apimConfigsError: null };
    case apimConstants.GET_APIM_CONFIGS_SUCCESS:
      return { ...state, apimConfigsLoading: false, apimConfigs: action.payload };
    case apimConstants.GET_APIM_CONFIGS_FAILURE:
      return { ...state, apimConfigsLoading: false, apimConfigsError: action.payload };

    case apimConstants.GENERATE_CREDENTIALS_REQUEST:
      return { ...state, generateCredentialsLoading: true, generateCredentialsError: null, generatedCredentials: null };
    case apimConstants.GENERATE_CREDENTIALS_SUCCESS:
      return { ...state, generateCredentialsLoading: false, generatedCredentials: action.payload };
    case apimConstants.GENERATE_CREDENTIALS_FAILURE:
      return { ...state, generateCredentialsLoading: false, generateCredentialsError: action.payload };
    case apimConstants.RESET_GENERATED_CREDENTIALS:
      return { ...state, generatedCredentials: null, generateCredentialsError: null };

    case apimConstants.ADD_SERVICES_REQUEST:
      return { ...state, addServicesLoading: true, addServicesError: null };
    case apimConstants.ADD_SERVICES_SUCCESS:
      return { ...state, addServicesLoading: false };
    case apimConstants.ADD_SERVICES_FAILURE:
      return { ...state, addServicesLoading: false, addServicesError: action.payload };

    default:
      return state;
  }
}
