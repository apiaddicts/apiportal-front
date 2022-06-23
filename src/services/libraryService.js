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
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.error(error);
    });
}

function getApis(top, skip, filter) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  let url = `${config.url}/apis?api-version=${config.apiVersion}&expandApiVersionSet=true&$skip=${skip}`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';
  url += filter !== undefined && filter !== null && filter.length > 0 ? `&$filter=${filter}` : '&$filter=isCurrent';
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getAPi(id) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/apis/${id}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getApiOpenAPI(id) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Accept': 'application/vnd.oai.openapi+json; charset=utf-8', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/apis/${id}?api-version=${config.apiVersion}&export=true&format=swagger`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.components && response.components.securitySchemes) {
        delete response.components.securitySchemes['apiKeyQuery'];
        /*response.components.securitySchemes['API Key Header'] = { ...response.components.securitySchemes['apiKeyHeader'] };
        delete response.components.securitySchemes['apiKeyHeader'];*/
      }
      if (response.securityDefinitions) {
        delete response.securityDefinitions['apiKeyQuery'];
        /*response.securityDefinitions['API Key Header'] = { ...response.securityDefinitions['apiKeyHeader'] };
        delete response.securityDefinitions['apiKeyHeader'];*/
      }
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getListTags() {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/tags?api-version=${config.apiVersion}&scope=apis`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getListTagsByApi(apiName) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/apis/${apiName}/tags?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function filterAPIsByTags(search, filter = 'isCurrent', top = config.topApi, skip = 0, includeNotTaggedApis = false) {
  const { token } = store.getState().user;

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/apis?api-version=${config.apiVersion}&expandApiVersionSet=${true}&$top=${top}&$skip=${skip}&$filter=${filter}&includeNotTaggedApis=${includeNotTaggedApis}&${search}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function searchApis(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/apis?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}')) or (contains(properties/description,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getApiHostnames(apiName) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/apis/${apiName}/hostnames?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

const libraryService = {
  getApiBookStores,
  getApiBookStore,
  getApis,
  getAPi,
  getApiOpenAPI,
  getListTags,
  getListTagsByApi,
  filterAPIsByTags,
  searchApis,
  getApiHostnames,
};

export default libraryService;
