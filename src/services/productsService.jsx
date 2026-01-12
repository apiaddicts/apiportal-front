import handleResponse from './handleResponse';
import config from './config';

import store from '../redux/store';

function listProducts(top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/products?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function searchProducts(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/products?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}')) or (contains(properties/description,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function filterProductsByName(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/products?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function filterProductsByDescription(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/products?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}&$filter=(contains(properties/description,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function filterProductAPIsByName(productName, search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.url}/products/${productName}/apis?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function filterProductAPIsByDescription(productName, search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.url}/products/${productName}/apis?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}&$filter=(contains(properties/description,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getProductDetail(productName) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/products/${productName}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getProductSuscripcion(productName, top, skip = 0) {
  const { token, id } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  let url = `${config.url}/users/${id}/subscriptions?api-version=${config.apiVersion}&$filter=(properties/scope eq '/products/${productName}')&$skip=${skip}`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getProductApis(productName, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/products/${productName}/apis?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getSubscriptions() {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  const url = `${config.apiUrl}/products`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
};

function getSubscriptionById(productId) {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  const url = `${config.apiUrl}/products?_where[slug]=${productId}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response[0])
    .catch((error) => error);
};

const productsService = {
  listProducts,
  searchProducts,
  filterProductsByName,
  filterProductsByDescription,
  filterProductAPIsByName,
  filterProductAPIsByDescription,
  getProductDetail,
  getProductSuscripcion,
  getProductApis,
  getSubscriptions,
  getSubscriptionById,
};

export default productsService;
