import handleResponse from './handleResponse';
import config from './config';

function getUserCredentials(userId, token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'apiKey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
  };
  return fetch(
    `${config.apiUrl}/user-credentials?filters[user][id][$eq]=${userId}&sort=createdAt:desc`,
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
      'apiKey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ data: credData }),
  };
  return fetch(`${config.apiUrl}/user-credentials`, requestOptions)
    .then(handleResponse)
    .catch(error => { console.error(error); });
}

const userCredentialService = {
  getUserCredentials,
  createUserCredential,
};

export default userCredentialService;
