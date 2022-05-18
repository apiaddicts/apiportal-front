import handleResponse from './handleResponse';
import config from './config';

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
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  const url = `${urlService}/apis?api-version=${config.apiVersion}`;
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

const libraryService = {
  getApiBookStores,
  getApiBookStore,
  getApis,
  getAPi,
};

export default libraryService;
