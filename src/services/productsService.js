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

  const url = `${config.apimUrl}/products/${productName}/apis?$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
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

  const url = `${config.apimUrl}/products/${productName}/apis?$top=${top}&$skip=${skip}&$filter=(contains(properties/description,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
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
};

export default productsService;
