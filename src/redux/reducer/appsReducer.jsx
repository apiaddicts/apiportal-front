import appsConstants from '../constants/appsConstants';

const initialState = {
  apps: {},
  appDetail: {},
  error: {},
  appsLoading: false,
  secretKeys: {},
  createdApp: {},
  appSkip: 0,
  appApisSkip: 0,
  primaryKey: {},
  secondaryKey: {},
  clientSecret: {},
  appSuscription: {},
  appSuscriptionLoading: false,
  appApis: {},
  appApisAll: {},
  appApisLoading: false,
  usrB2cReq: false,
  usrB2cSucc: {},
  usrB2cFail: {},
  addApisRes: 'ERROR',
  allowedApps: {},
  allowedAppsSkip: 0,
  notificationSuccMsg: null,
  activeStep: 0,
};

export default function appsReducer(state = initialState, { type, payload, res } = {}) {
  switch (type) {
    case appsConstants.LIST_ALL_APPS_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.LIST_ALL_APPS_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        apps: payload,
      };

    case appsConstants.LIST_ALL_APPS_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };

    case appsConstants.GET_DETAIL_APP_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };
    case appsConstants.GET_DETAIL_APP_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        secretKeys: payload,
      };
    case appsConstants.GET_DETAIL_APP_ERROR:
      return {
        ...state,
        appsLoading: false,
        secretKeys: {},
        error: payload,
      };

    case appsConstants.GET_DETAIL_APP_SUSCRIPTION_REQUEST:
      return {
        ...state,
        appSuscriptionLoading: true,
      };
    case appsConstants.GET_DETAIL_APP_SUSCRIPTION_SUCCESS:
      return {
        ...state,
        appSuscriptionLoading: false,
        appSuscription: payload,
      };
    case appsConstants.GET_DETAIL_APP_SUSCRIPTION_ERROR:
      return {
        ...state,
        appSuscriptionLoading: false,
        error: payload,
      };

    case appsConstants.GET_DETAIL_APP_APIS_REQUEST:
      return {
        ...state,
        appApisLoading: true,
      };
    case appsConstants.GET_DETAIL_APP_APIS_SUCCESS:
      return {
        ...state,
        appApisLoading: false,
        appApis: payload,
        appApisAll: res,
      };
    case appsConstants.GET_DETAIL_APP_APIS_ERROR:
      return {
        ...state,
        appApisLoading: false,
        error: payload,
      };

    case appsConstants.ADD_API_APP_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };
    case appsConstants.ADD_API_APP_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        addApisRes: payload,
      };

    case appsConstants.ADD_API_APP_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };

    case appsConstants.DELETE_API_APP_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };
    case appsConstants.DELETE_API_APP_SUCCESS:
      return {
        ...state,
        appsLoading: false,
      };

    case appsConstants.DELETE_API_APP_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };

    case appsConstants.UPDATE_APP_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.UPDATE_APP_SUCCESS:
      return {
        ...state,
        appsLoading: false,
      };

    case appsConstants.UPDATE_APP_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };

    case appsConstants.GET_SECRET_KEYS_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.GET_SECRET_KEYS_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        secretKeys: payload,
      };

    case appsConstants.GET_SECRET_KEYS_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };

    case appsConstants.FILTER_APPS_BY_NAME_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.FILTER_APPS_BY_NAME_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        apps: payload,
      };

    case appsConstants.FILTER_APPS_BY_DATE_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.FILTER_APPS_BY_DATE_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        apps: payload,
      };

    case appsConstants.CREATE_APP_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.CREATE_APP_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        createdApp: payload,
        error: {},
      };

    case appsConstants.CREATE_APP_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
        createdApp: {},
      };

    case appsConstants.GET_APPS_SKIP:
      return {
        ...state,
        appSkip: payload,
      };

    case appsConstants.GET_APPS_API_SKIP:
      return {
        ...state,
        appApisSkip: payload,
      };

    case appsConstants.REGENERATE_PRIMARY_KEY_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.REGENERATE_PRIMARY_KEY_SUCCESS:
      return {
        ...state,
        primaryKey: payload,
        appsLoading: false,
      };

    case appsConstants.REGENERATE_PRIMARY_KEY_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };

    case appsConstants.REGENERATE_SECONDARY_KEY_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.REGENERATE_SECONDARY_KEY_SUCCESS:
      return {
        ...state,
        secondaryKey: payload,
        appsLoading: false,
      };

    case appsConstants.REGENERATE_SECONDARY_KEY_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };

    case appsConstants.REGENERATE_CLIENT_SECRET_REQUEST:
      return {
        ...state,
        appSuscriptionLoading: true,
      };

    case appsConstants.REGENERATE_CLIENT_SECRET_SUCCESS:
      return {
        ...state,
        clientSecret: payload,
        appSuscriptionLoading: false,
      };

    case appsConstants.REGENERATE_CLIENT_SECRET_ERROR:
      return {
        ...state,
        appSuscriptionLoading: false,
        error: payload,
      };

    case appsConstants.RESET_ERRORS:
      return {
        ...state,
        error: {},
      };

    case appsConstants.DELETE_APP_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.DELETE_APP_SUCCESS:
      return {
        ...state,
        appsLoading: false,
      };

    case appsConstants.DELETE_APP_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: action.payload,
      };

    case appsConstants.REGISTER_USER_B2C_REQUEST:
      return {
        ...state,
        usrB2cReq: true,
      };

    case appsConstants.REGISTER_USER_B2C_SUCCESS:
      return {
        ...state,
        usrB2cReq: false,
        usrB2cSucc: payload,
      };

    case appsConstants.REGISTER_USER_B2C_ERROR:
      return {
        ...state,
        usrB2cReq: false,
        usrB2cFail: payload,
      };

    case appsConstants.RESET_APPS:
      return {
        ...state,
        appSkip: 0,
        createdApp: {},
        addApisRes: 'ERROR',
      };

    case appsConstants.RESET_B2C_ALERT:
      return {
        ...state,
        usrB2cSucc: {},
        usrB2cFail: {},
        usrB2cReq: false,
      };

    case appsConstants.LIST_ALLOWED_APPS_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.LIST_ALLOWED_APPS_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        allowedApps: payload,
      };

    case appsConstants.LIST_ALLOWED_APPS_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };

    case appsConstants.NOTIFY_ALLOWED_APPS_REQUEST:
      return {
        ...state,
        appsLoading: true,
      };

    case appsConstants.NOTIFY_ALLOWED_APPS_SUCCESS:
      return {
        ...state,
        appsLoading: false,
        notificationSuccMsg: payload,
      };

    case appsConstants.NOTIFY_ALLOWED_APPS_ERROR:
      return {
        ...state,
        appsLoading: false,
        error: payload,
      };
    case appsConstants.RESET_NOTIFICATION_SUCC_MSG:
      return {
        ...state,
        notificationSuccMsg: null,
      };
    case appsConstants.SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: payload,
      };
    default:
      return state;
  }
};
