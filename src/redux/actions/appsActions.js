import appsConstants from '../constants/appsConstants';
import appsService from '../../services/appsService';
import store from '../store';
import config from '../../services/config';

const listApps = (top, skip) => (dispatch) => {
  dispatch({
    type: appsConstants.LIST_ALL_APPS_REQUEST,
  });
  appsService.listAllApps(top, skip)
    .then(
      (response) => {
        dispatch({
          type: appsConstants.LIST_ALL_APPS_SUCCESS,
          payload: response,
        });
      },
      (error) => {
        dispatch({
          type: appsConstants.LIST_ALL_APPS_ERROR,
          payload: error.message,
        });
      },
    );
};

const getAppDetail = (appId) => (dispatch) => {
  dispatch({
    type: appsConstants.GET_DETAIL_APP_REQUEST,
  });
  appsService.getAppDetail(appId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_SUCCESS,
            payload: response.data,
          });
        }
      }
    });
};

const getAppDetailSuscription = (appObjId) => (dispatch) => {
  dispatch({
    type: appsConstants.GET_DETAIL_APP_SUSCRIPTION_REQUEST,
  });
  appsService.getAppDetailSuscription(appObjId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_SUSCRIPTION_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_SUSCRIPTION_SUCCESS,
            payload: response.data,
          });
        }
      }
    });
};

const getAppDetailApis = (appObjId, top = config.topApi, skip = 0, filter = '') => (dispatch) => {
  dispatch({
    type: appsConstants.GET_DETAIL_APP_APIS_REQUEST,
  });
  appsService.getAppDetailApis(appObjId, top, skip, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_APIS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_APIS_SUCCESS,
            payload: response.data,
            res: response,
          });
        }
      }
    });
};

const addApisApp = (data, appId) => (dispatch) => {
  const { applicationObjectId } = data;
  dispatch({
    type: appsConstants.ADD_API_APP_REQUEST,
  });
  appsService.addApiApp(data, appId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.ADD_API_APP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.ADD_API_APP_SUCCESS,
            payload: 'SUCCESS',
          });
        }
      } else {
        dispatch({
          type: appsConstants.ADD_API_APP_SUCCESS,
          payload: 'SUCCESS',
        });
      }
    })
    .finally(() => {
      dispatch(getAppDetail(applicationObjectId));
      dispatch(getAppDetailApis(applicationObjectId));
      dispatch(getAppDetailSuscription(applicationObjectId));
      dispatch(listApps());
    });
};

const deleteApiApp = ({ objId, apiName }) => (dispatch) => {
  dispatch({
    type: appsConstants.DELETE_API_APP_REQUEST,
  });
  appsService.deleteApiApp(objId, apiName)
    .then((response) => {
      dispatch({
        type: appsConstants.DELETE_API_APP_SUCCESS,
        payload: response,
      });
    }, (error) => {
      dispatch({
        type: appsConstants.DELETE_API_APP_ERROR,
        payload: error.message,
      });
    })
    .finally(() => {
      dispatch(getAppDetail(objId));
      dispatch(getAppDetailApis(objId));
      dispatch(getAppDetailSuscription(objId));
    });
};

const createApp = (data) => (dispatch) => {
  dispatch({
    type: appsConstants.CREATE_APP_REQUEST,
  });
  appsService.createApp(data)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.CREATE_APP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.CREATE_APP_SUCCESS,
            payload: response.data,
          });
        }
      }
    })
    .finally(() => {
      dispatch(listApps());
    });
};

const updateApp = (data, id) => (dispatch) => {
  dispatch({
    type: appsConstants.UPDATE_APP_REQUEST,
  });
  appsService.updateApp(data, id)
    .then((response) => {
      dispatch({
        type: appsConstants.UPDATE_APP_SUCCESS,
        payload: response,
      });
    }, (error) => {
      dispatch({
        type: appsConstants.UPDATE_APP_ERROR,
        payload: error.message,
      });
    }).finally(() => dispatch(getAppDetail(id)));
};

const filterByName = (search, top = config.topApps, skip = 0) => (dispatch) => {
  appsService.filterAppsByName(search, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.LIST_ALL_APPS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.LIST_ALL_APPS_SUCCESS,
            payload: response,
          });
          dispatch({
            type: appsConstants.GET_APPS_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const filterByApi = (search, top = config.topApps, skip = 0) => (dispatch) => {
  appsService.filterAppsByApis(search, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.LIST_ALL_APPS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.LIST_ALL_APPS_SUCCESS,
            payload: response,
          });
          dispatch({
            type: appsConstants.GET_APPS_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const filterByDate = (search, top = config.topApps, skip = 0) => (dispatch) => {
  appsService.filterAppsByDate(search, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.LIST_ALL_APPS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.LIST_ALL_APPS_SUCCESS,
            payload: response.data,
          });
        }
      }
    });
};

const filterAppApisByName = (appObjId, search, top = config.topApi, skip = 0) => (dispatch) => {
  const filter = `api=${search}`;
  appsService.getAppDetailApis(appObjId, top, skip, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_APIS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_APIS_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: appsConstants.GET_APPS_API_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const filterAppApisByProduct = (appObjId, search, top = config.topApi, skip = 0) => (dispatch) => {
  const filter = `product=${search}`;
  appsService.getAppDetailApis(appObjId, top, skip, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_APIS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_APIS_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: appsConstants.GET_APPS_API_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const filterAppApisByDescription = (appObjId, search, top = config.topApi, skip = 0) => (dispatch) => {
  const filter = `apiDescription=${search}`;
  appsService.getAppDetailApis(appObjId, top, skip, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_APIS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.GET_DETAIL_APP_APIS_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: appsConstants.GET_APPS_API_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const getAppsNext = () => (dispatch) => {
  const { appSkip } = store.getState().apps;
  const skip = parseInt(appSkip, 10) + parseInt(config.topApps, 10);
  dispatch(listApps(config.topApps, skip));
  dispatch({
    type: appsConstants.GET_APPS_SKIP,
    payload: skip,
  });
};

const getAppsPrevious = () => (dispatch) => {
  const { appSkip } = store.getState().apps;
  const skip = parseInt(appSkip, 10) - parseInt(config.topApps, 10);
  dispatch(listApps(config.topApps, skip));
  dispatch({
    type: appsConstants.GET_APPS_SKIP,
    payload: skip,
  });
};

const getAppsApisNext = (appObjId) => (dispatch) => {
  const { appApisSkip } = store.getState().apps;
  const skip = parseInt(appApisSkip, 10) + parseInt(config.topApi, 10);
  dispatch(getAppDetailApis(appObjId, config.topApi, skip));
  dispatch({
    type: appsConstants.GET_APPS_API_SKIP,
    payload: skip,
  });
};

const getAppsApisPrevious = (appObjId) => (dispatch) => {
  const { appApisSkip } = store.getState().apps;
  const skip = parseInt(appApisSkip, 10) - parseInt(config.topApi, 10);
  dispatch(getAppDetailApis(appObjId, config.topApi, skip));
  dispatch({
    type: appsConstants.GET_APPS_API_SKIP,
    payload: skip,
  });
};

const regeneratePrimaryKey = ({ userId, subscriptionId, appId }) => (dispatch) => {
  console.log(userId, subscriptionId, appId);
  dispatch({
    type: appsConstants.REGENERATE_PRIMARY_KEY_REQUEST,
  });
  appsService.regeneratePrimaryKey(userId, subscriptionId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.REGENERATE_PRIMARY_KEY_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.REGENERATE_PRIMARY_KEY_SUCCESS,
            payload: response.data,
          });
        }
      }
    }).finally(() => {
      dispatch(getAppDetail(appId));
      dispatch(getAppDetailApis(appId));
      dispatch(getAppDetailSuscription(appId));
    });
};

const regenerateSecondaryKey = ({ userId, subscriptionId, appId }) => (dispatch) => {
  dispatch({
    type: appsConstants.REGENERATE_SECONDARY_KEY_REQUEST,
  });
  appsService.regenerateSecondaryKey(userId, subscriptionId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.REGENERATE_SECONDARY_KEY_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.REGENERATE_SECONDARY_KEY_SUCCESS,
            payload: response.data,
          });
        }
      }
    }).finally(() => {
      dispatch(getAppDetail(appId));
      dispatch(getAppDetailApis(appId));
      dispatch(getAppDetailSuscription(appId));
    });
};

const regenerateClientSecret = (data) => (dispatch) => {
  const { objId } = data;
  dispatch({
    type: appsConstants.REGENERATE_CLIENT_SECRET_REQUEST,
  });
  appsService.regenerateClientSecret(data)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.REGENERATE_CLIENT_SECRET_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.REGENERATE_CLIENT_SECRET_SUCCESS,
            payload: response.data,
          });
        }
      }
    }).finally(() => {
      dispatch(getAppDetail(objId));
      dispatch(getAppDetailApis(objId));
      dispatch(getAppDetailSuscription(objId));
    });
};

const resetErrors = () => (dispatch) => {
  dispatch({
    type: appsConstants.RESET_ERRORS,
  });
};

const registerUserb2c = (data) => (dispatch) => {
  dispatch({
    type: appsConstants.REGISTER_USER_B2C_REQUEST,
  });
  appsService.registerUserb2c(data)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.REGISTER_USER_B2C_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.REGISTER_USER_B2C_SUCCESS,
            payload: response,
          });
        }
      }
    });
};

const resetApps = () => (dispatch) => {
  dispatch({
    type: appsConstants.RESET_APPS,
  });
};

const deleteApp = (id) => (dispatch) => {
  dispatch({
    type: appsConstants.DELETE_APP_REQUEST,
  });
  appsService.deleteApp(id)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.DELETE_APP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.DELETE_APP_SUCCESS,
            payload: response.data,
          });
        }
      }
    }).finally(() => {
      dispatch(resetApps());
      dispatch(listApps());
    });
};

const getAllowedApps = (userId) => (dispatch) => {
  dispatch({
    type: appsConstants.LIST_ALLOWED_APPS_REQUEST,
  });
  appsService.getAllowedApps(userId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.LIST_ALLOWED_APPS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.LIST_ALLOWED_APPS_SUCCESS,
            payload: response.data,
          });
        }
      }
    });
};

const notifyAllowedApp = (appObjId) => (dispatch) => {
  dispatch({
    type: appsConstants.NOTIFY_ALLOWED_APPS_REQUEST,
  });
  appsService.notifyAllowedApp(appObjId)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: appsConstants.NOTIFY_ALLOWED_APPS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: appsConstants.NOTIFY_ALLOWED_APPS_SUCCESS,
            payload: response.data,
          });
        }
      }
    })
    .finally(() => {
      dispatch({ type: appsConstants.RESET_NOTIFICATION_SUCC_MSG });
    });
};

const setActiveStep = (step) => (dispatch) => {
  dispatch({
    type: appsConstants.SET_ACTIVE_STEP,
    payload: step,
  });
};

const appsActions = {
  listApps,
  getAppDetail,
  getAppDetailSuscription,
  getAppDetailApis,
  addApisApp,
  deleteApiApp,
  createApp,
  updateApp,
  filterByName,
  filterByApi,
  filterByDate,
  getAppsNext,
  getAppsPrevious,
  regeneratePrimaryKey,
  regenerateSecondaryKey,
  regenerateClientSecret,
  resetErrors,
  registerUserb2c,
  deleteApp,
  getAppsApisNext,
  getAppsApisPrevious,
  filterAppApisByName,
  filterAppApisByProduct,
  filterAppApisByDescription,
  resetApps,
  getAllowedApps,
  notifyAllowedApp,
  setActiveStep,
};

export default appsActions;
