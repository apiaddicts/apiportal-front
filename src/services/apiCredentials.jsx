import config from './config';

function generateCredentials(apimConfigDocumentId, userId, services, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': `${config.strapiApiKey}`,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, services }),
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

const CredentialsService = {
  generateCredentials,
  addServices,
};
export default CredentialsService;

