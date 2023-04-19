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
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  let url = `${config.apimUrl}/apis?expandApiVersionSet=true`;
  url += filter !== undefined && filter !== null && filter.length > 0 ? `&$filter=${filter}` : '';
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function listApisProduct(top, skip, filter) {

  const { token } = store.getState().user;

  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/apis-with-products?expandApiVersionSet`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';
  url += filter !== undefined && filter !== null && filter.length > 0 ? `&$filter=${filter}` : '';

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response.data)
    .catch((error) => error);

}

function getAPi(id) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/apis/${id}?expandApiVersionSet=true&exportQuery&format`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return str;
  }
  return JSON.parse(str);
};

function getApiOpenAPI(id) {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `${config.apiUrl}/sura-library-apis?_where[slug]=${id}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.length === 0) return null;
      if (response[0].openDoc.components && response[0].openDoc.components.securitySchemes) {
        delete response[0].openDoc.components.securitySchemes['apiKeyQuery'];
      }
      if (response[0].openDoc.security) {
        delete response[0].openDoc.security['apiKeyQuery'];
      }

      const strOpenDoc = response[0].openDoc;

      return isJsonString(strOpenDoc);
    }).catch((error) => {
      console.error(error);
    });
}

function getApiDescription(id) {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const url = `${config.apiUrl}/sura-library-apis?_where[slug]=${id}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response[0])
    .catch((error) => error);
}

function getListTags(skip = 0, filter = '') {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/api-tags?$skip=${skip}&expandApiVersionSet=true&includeNotTaggedApis=false`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

function getListTagsByApi(apiName) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/apis/${apiName}/tags`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

function filterAPIsByTags(data) {
  const { token } = store.getState().user;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/apis-by-tags/get`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

function searchApis(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/apis?$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}')) or (contains(properties/description,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

function getApiHostnames(apiName) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/apis/${apiName}/hostnames`;
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
  getApiDescription,
  listApisProduct,
};

export default libraryService;
