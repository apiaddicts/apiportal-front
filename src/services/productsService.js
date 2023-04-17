import handleResponse from './handleResponse';
import config from './config';

import store from '../redux/store';

function listProducts(top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/products?$skip=${skip}&include_applications=false`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

function searchProducts(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/products?$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}')) or (contains(properties/description,'${search}'))&include_applications=false`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

function filterProductsByName(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/products?$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}'))&include_applications=false`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error(error);
    });
}

function filterProductsByDescription(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/products?$top=${top}&$skip=${skip}&$filter=(contains(properties/description,'${search}'))&include_applications=false`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
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
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/products/${productName}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getProductSuscripcion(productName, top, skip) {
  const { token, id } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/users/${id}/products/${productName}/subscriptions?$skip=${skip}`;
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
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/products/${productName}/apis?$top=${top}&$skip=${skip}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response.data;
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
