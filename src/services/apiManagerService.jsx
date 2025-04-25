import handleResponse from './handleResponse';

import config from './config';

function integrationLogin(configType) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-apimanager-id': `${configType}`
    },
    body: JSON.stringify({})
  }
  const url = `${config.integratorUrl}/login`;


  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
    })
}

function integrationListApis(configType) {
  console.log('Fetching API listsasdas...');
  const requestOptions = {
    method: 'GET',
    headers: { 'x-apimanager-id': `${configType}` }
  }
  const url = `${config.integratorUrl}/list-apis`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
    })
}

function integrationApiDetail(configType, apiId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'x-apimanager-id': `${configType}` }
  }
  const url = `${config.integratorUrl}/api-detail/${apiId}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
    })
}

function getApiDefinition(configType, assetId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'x-apimanager-id': `${configType}` }
  }

  const url = `${config.integratorUrl}/definition/${assetId}`
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
    })
}

const integrationService = {
  integrationLogin,
  integrationListApis,
  integrationApiDetail,
  getApiDefinition
}
export default integrationService;

