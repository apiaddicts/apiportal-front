import handleResponse from './handleResponse';
import config from './config';

function getUserCredentials(userId, token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
  };
  return fetch(
    `${config.apiUrl}/user-credentials?filters[user][id][$eq]=${userId}&sort=createdAt:desc&populate=products&populate[apim_config][fields][0]=documentId&populate[apim_config][fields][1]=name`,
    requestOptions,
  )
    .then(handleResponse)
    .catch(error => { console.error(error); });
}

function getUserCredential(documentId, token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
  };
  return fetch(
    `${config.apiUrl}/user-credentials/${documentId}?populate[products][fields][0]=name&populate[products][fields][1]=documentId&populate[apim_config][fields][0]=documentId&populate[apim_config][fields][1]=name`,
    requestOptions,
  )
    .then(handleResponse)
    .catch(error => { console.error(error); });
}

function createUserCredential(credData, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ data: credData }),
  };
  return fetch(`${config.apiUrl}/user-credentials`, requestOptions)
    .then(handleResponse)
    .catch(error => { console.error(error); });
}

function addProductsToCredential(documentId, products, apimConfigDocumentId, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ products, apimConfigDocumentId }),
  };
  return fetch(`${config.apiUrl}/user-credentials/${documentId}/add-products`, requestOptions)
    .then(handleResponse)
    .catch(error => { console.error(error); });
}

const userCredentialService = {
  getUserCredentials,
  getUserCredential,
  createUserCredential,
  addProductsToCredential,
};

export default userCredentialService;

