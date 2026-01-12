import settingPageConstants from '../constants/settingPageConstants';

const initialState = {
  settingPages: [],
  settingPage: {},
  definition: {},
  loading: false,
  error: {}
}

export default function settingPageReducer(state = initialState, action) {
  switch (action.type) {
    case settingPageConstants.GET_ALL_SETTING_PAGE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case settingPageConstants.GET_ALL_SETTING_PAGE_SUCCESS:
      return {
        ...state,
        settingPages: action.payload.data || [],
        settingPage: action.payload.data?.[0] || {},  // este te da acceso directo al objeto
        loading: false,
        error: {}
      }
    case settingPageConstants.GET_ALL_SETTING_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        settingPages: [],
        error: action.payload
      }
    case settingPageConstants.GET_SETTING_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case settingPageConstants.GET_SETTING_PAGE_SUCCESS:
      return {
        ...state,
        settingPage: action.payload,
        loading: false
      }
    case settingPageConstants.GET_SETTING_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        settingPage: {}
      }
    case settingPageConstants.RESET_SETTING_PAGE:
      return {
        ...state,
        settingPage: {},
        error: {},
        definition: {}
      };
    case settingPageConstants.GET_DEFINITION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case settingPageConstants.GET_DEFINITION_SUCCESS:
      return {
        ...state,
        loading: false,
        definition: action.payload
      };
    case settingPageConstants.GET_DEFINITION_FAILED:
      return {
        ...state,
        loading: false,
        definition: {},
        error: action.payload
      };
    default:
      return state;
  }
}