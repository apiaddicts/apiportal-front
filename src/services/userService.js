import handleResponse from './handleResponse';
import handleResponseToken from './handleResponseToken';
import handleResponseRestore from './handleResponseRestore';
import handleResponseResetPwd from './handleResponseResetPwd';
import config from './config';

import store from '../redux/store';

function login(email, password) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${btoa(`${email}:${password}`)}` },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/identity?api-version=${config.apiVersion}`;

  return fetch(
    url,
    requestOptions,
  ).then(handleResponseToken)
    .then((response) => {
      return response;
    });
}

function confirmAccount(queryParams) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `Ticket id="${queryParams.ticketId}",ticket="${queryParams.ticket}"` },
  };
  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/users/${queryParams.userId}/identities/Basic/${queryParams.identity}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponseToken)
    .then((response) => {
      return { ...response, id: queryParams.userId };
    });
}

function getUserDetails(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/users/${id}?api-version=${config.apiVersion}`;
  return fetch(
    url,
    requestOptions,
  ).then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getUserSuscriptions(subscriptionId, resourceGroupName, serviceName, apiVersion) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `${userToken}` },
  };

  return fetch(
    `${config.suraUrl}/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ApiManagement/service/${serviceName}/users/:userId/subscriptions?api-version=${apiVersion}`,
    requestOptions,
  ).then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getUserEntityTag(token, id) {
  const requestOptions = {
    method: 'HEAD',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/users/${id}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then((response) => response.text().then((text) => {
      const etag = response.headers.get('ETag');
      const data = { etag: etag.replace(/['"]+/g, '') };
      switch (response.status) {
        case 200:
          return data;
        default:
          return Promise.reject(data);
      }
    }))
    .then((result) => result);
}

function updateUser(data) {
  const { id, token, etag } = store.getState().user;
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}`, 'If-Match': `${etag}` },
    body: JSON.stringify(data),
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/users/${id}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function signUp(data) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `${config.hmacAuthHeader}` },
    body: JSON.stringify(data),
  };
  const uuid = crypto.randomUUID();
  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/users/${uuid}?api-version=${config.apiVersion}`;
  return fetch(
    url,
    requestOptions,
  ).then(handleResponse)
    .then((response) => {
      return response;
    });
}

function verifyOldPassword(data) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `Basic ${btoa(`${data.email}:${data.password}`)}` },
  };
  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/identity?api-version=${config.apiVersion}`;
  return fetch(
    url,
    requestOptions,
  ).then(handleResponseRestore)
    .then((response) => {
      return response;
    });
}

function changePassword(newPassword) {
  const { id, token, etag } = store.getState().user;
  const data = {
    properties: {
      password: newPassword,
    },
  };
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}`, 'If-Match': `${etag}` },
    body: JSON.stringify(data),
  };
  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/users/${id}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function resetPassword(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `${config.hmacAuthHeader}` },
    body: JSON.stringify(data),
  };
  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/confirmations/password?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function resetPasswordWithTicket(queryParams, data) {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `Ticket id="${queryParams.ticketid}",ticket="${queryParams.ticket}"` },
    body: JSON.stringify(data),
  };
  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/users/${queryParams.id}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponseResetPwd)
    .then((response) => {
      return response;
    });
}

const userService = {
  login,
  confirmAccount,
  getUserDetails,
  getUserSuscriptions,
  getUserEntityTag,
  signUp,
  updateUser,
  verifyOldPassword,
  changePassword,
  resetPassword,
  resetPasswordWithTicket,
};

export default userService;

