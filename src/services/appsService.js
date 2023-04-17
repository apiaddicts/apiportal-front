import config from './config';
import handleResponse from './handleResponse';
import store from '../redux/store';

const listAllApps = (top = config.topApps, skip = 0) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/applications?$skip=${skip}`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const addApiApp = (data, appId) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'POST',
    headers: { 'Authorization': token, 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/applications/${appId}/apis`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);

};

const deleteApiApp = (objId, apiName) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'DELETE',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/applications/${objId}/apis/${apiName}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const createApp = (data) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'POST',
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/applications`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const updateApp = (data, appId) => {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'PATCH',
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/applications/${appId}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const getAppDetail = (appObjId) => {
  const { token } = store.getState().user;
  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };
  const url = `${config.apimUrl}/applications/${appObjId}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const getAppDetailSuscription = (appObjId) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/applications/${appObjId}/secrets`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const getAppDetailApis = (appObjId, top, skip, filter) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };
  let url = `${config.apimUrl}/applications/${appObjId}/apis?$skip=${skip}`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';
  url += filter !== undefined && filter !== null && filter !== '' ? `&$filter=${filter}` : '';

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const filterAppsByApis = (search, top, skip) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/applications?$top=${top}&$skip=${skip}&$filter=api=${search}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const regeneratePrimaryKey = (userId, subscriptionId) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'POST',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${userId}/subscriptions/${subscriptionId}/primary-key`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const regenerateSecondaryKey = (userId, subscriptionId) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'POST',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${userId}/subscriptions/${subscriptionId}/secondary-key`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const regenerateClientSecret = ({ objId, name, expiration }) => {
  const { token } = store.getState().user;

  const data = {
    displayName: name,
    daysToExpirationSecret: expiration,
  };

  const requestHeaders = {
    method: 'POST',
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/applications/${objId}/secrets`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const registerUserb2c = (data) => {
  const { token } = store.getState().user;

  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/azure-b2c-users`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const filterAppsByName = (search, top, skip) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/applications?$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}'))`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const filterAppsByDate = (search, top, skip) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/applications?$top=${top}&$skip=${skip}&$filter=(contains(properties/cratedDateTime,'${search}'))`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const deleteApp = (id) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'DELETE',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/applications/${id}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);

};

const getAllowedApps = (userId) => {
  const { token } = store.getState().user;
  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };
  const url = `${config.apimUrl}/users/${userId}/applications`;
  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const filterAllowedAppsByName = (search, top, skip) => {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = 'service/url';
  // const url = `${config.apimUrl}/applications?$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}'))`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const notifyAllowedApp = (appObjId) => {
  const { token } = store.getState().user;
  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };
  const url = `${config.apimUrl}/applications/${appObjId}/consent-notification`;
  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

const appsService = {
  listAllApps,
  getAppDetail,
  getAppDetailSuscription,
  getAppDetailApis,
  addApiApp,
  createApp,
  updateApp,
  deleteApiApp,
  filterAppsByName,
  filterAppsByDate,
  filterAppsByApis,
  regeneratePrimaryKey,
  regenerateSecondaryKey,
  regenerateClientSecret,
  registerUserb2c,
  deleteApp,
  getAllowedApps,
  filterAllowedAppsByName,
  notifyAllowedApp,
};

export default appsService;
