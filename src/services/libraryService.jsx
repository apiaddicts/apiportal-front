import handleResponse from './handleResponse';
import config from './config';

import store from '../redux/store';

function getApiBookStores() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${config.apiUrl}/library-apis?filters[publish][$eq]=publicado&populate[tags]=*`, requestOptions)
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
  return fetch(`${config.apiUrl}/library-apis/${id}`, requestOptions)
    .then(handleResponse)
    .then((library) => {
      return library;
    }).catch((error) => {
      console.error(error);
    });
}

function getApis(filter) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  let url = `${config.url}/apis?api-version=${config.apiVersion}&expandApiVersionSet=true&tags[0]=published`;
  url += filter !== undefined && filter !== null && filter.length > 0 ? `&$filter=${filter}` : '&$filter=isCurrent';
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

function getApiDescription(id) {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const url = `${config.apiUrl}/library-apis?_where[slug]=${id}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response[0])
    .catch((error) => error);
}

function getOpenApiFromStrapi(id) {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const url = `${config.apiUrl}/library-apis?_where[slug]=${id}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response[0])
    .catch((error) => error);
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
function filterAPIsByTags(data) {
  const { token } = store.getState().user;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/apis?api-version=${config.apiVersion}&expandApiVersionSet=${true}&$filter=${filter}&includeNotTaggedApis=${includeNotTaggedApis}&${search}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

function searchApis(search) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/apis?api-version=${config.apiVersion}&tags[0]=published&$filter=(contains(properties/displayName,'${search}')) or (contains(properties/description,'${search}'))`;

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

const getApiProducts = (apiId) => {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `SharedAccessSignature ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const url = `${config.url}/apis/${apiId}/products?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
};

const getApisUnsecure = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
  };

  const url = 'https://wkeapipre.management.azure-api.net/subscriptions/d191459e-3142-4ecb-8468-89398ec98aac/resourceGroups/RG-PRE-SHARED/providers/Microsoft.ApiManagement/service/WKEAPIPRE/apis?api-version=2021-08-01';

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response.value)
    .catch((error) => error);

};

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
  getApiProducts,
  getApisUnsecure,
  getOpenApiFromStrapi,
};

export default libraryService;
