import handleResponse from './handleResponse';
import handleResponseToken from './handleResponseToken';
import config from './config';

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

function signUp(data) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Accept': '*/*', 'Authorization': `${config.hmacAuthHeader}` },
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

const userService = {
  login,
  getUserDetails,
  getUserSuscriptions,
  signUp,
};

export default userService;

