import handleResponse from './handleResponse';
import config from './config';

import store from '../redux/store';

function getApiBookStores() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${config.apiUrl}/sura-library-apis/`, requestOptions)
    .then(handleResponse)
    .then((libraries) => {
      return libraries;
    });
}

function getApiBookStore(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${config.apiUrl}/sura-library-apis/${id}`, requestOptions)
    .then(handleResponse)
    .then((library) => {
      return library;
    });
}

function getApis() {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/apis?api-version=${config.apiVersion}&expandApiVersionSet=true&$top=50&$skip=0&$filter=isCurrent`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getAPi(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/apis/${id}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getListTags() {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/tags?api-version=${config.apiVersion}&scope=apis`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getListTagsByApi(apiName) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/apis/${apiName}/tags?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function filterAPIsByTags(top, skip, filter = 'isCurrent', includeNotTaggedApis = false) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/apis?api-version=${config.apiVersion}&expandApiVersionSet=${true}&$top=${top}&$skip=${skip}&$filter=${filter}&includeNotTaggedApis=${includeNotTaggedApis}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function searchApis(search, top = 2, skip = 0) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/apis?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}')) or (contains(properties/description,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

const libraryService = {
  getApiBookStores,
  getApiBookStore,
  getApis,
  getAPi,
  getListTags,
  getListTagsByApi,
  filterAPIsByTags,
  searchApis,
};

export default libraryService;
