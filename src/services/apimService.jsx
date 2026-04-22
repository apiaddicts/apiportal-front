import handleResponse from './handleResponse';

import config from './config';


function getApimConfig() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'apikey': `${config.strapiApiKey}`,
    },
  };
  const url = `${config.apiUrl}/apim-configs`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(response => response)
    .catch(error => { console.error(error); });
}

function getApimConfigs() {
  const requestOptions = {
    method: 'GET',
    headers: { 'apiKey': `${config.strapiApiKey}` },
  };
  return fetch(`${config.apiUrl}/apim-configs?populate=configurations`, requestOptions)
    .then(handleResponse)
    .catch(error => { console.error(error); });
}

function generateCredentials(apimConfigDocumentId, credId, services, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ credId, services }),
  };
  return fetch(`${config.apiUrl}/apim-configs/${apimConfigDocumentId}/credentials`, requestOptions)
    .then(response => response.json())
    .catch(error => { console.error(error); });
}

function addServices(apimConfigDocumentId, consumerId, services, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ consumerId, services }),
  };
  return fetch(`${config.apiUrl}/apim-configs/${apimConfigDocumentId}/add-services`, requestOptions)
    .then(response => response.json())
    .catch(error => { console.error(error); });
}

const apimService = {
  getApimConfig,
  getApimConfigs,
  generateCredentials,
  addServices,
};

export default apimService;