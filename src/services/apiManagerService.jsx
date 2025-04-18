import handleResponse from './handleResponse';

import config from './config';

function integrationLogin(configType){
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-apimanager-id': `${configType}`},
      body: JSON.stringify({})
  }
  const url = `${config.integratorUrl}/login`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(response => {
      console.log('response desde el servicio de integracion');
      return response;
    })
    .catch(error => {
      console.error(error);
    })
}

function integrationListApis(configType) {
  const requestOptions = {
    method: 'GET',
    headers: {'x-apimanager-id': `${configType}`}
  }
  const url = `${config.integratorUrl}/list-apis`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(response => {
      console.log('response desde el servicio listar apis');
      console.log(response);
      return response;
    })
    .catch(error => {
      console.error(error);
    })
}

function integrationApiDetail(configType, apiId) {
  const requestOptions = {
    method: 'GET',
    headers: {'x-apimanager-id': `${configType}`}
  }
  const url = `${config.integratorUrl}/api-detail/${apiId}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(response => {
      console.log('response desde el servicio de detalle de la api');
      console.log(response);
      return response;
    })
    .catch(error => {
      console.error(error);
    })
}

const integrationService = {
  integrationLogin,
  integrationListApis,
  integrationApiDetail
}
export default integrationService;

