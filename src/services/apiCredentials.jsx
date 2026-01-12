import handleResponse from './handleResponse';

import config from './config';



function Credentials(configType, token) {



  const requestOptions = {
    method: 'GET',
    headers: {
      'x-apimanager-id': 'manager-mulesoft',
      'apiKey': `${config.integratorApiKey}`,
      'Authorization': `Bearer ${token}`
    }
  }

  const url = `${config.integratorUrl}/credentials`;
  return fetch(url, requestOptions)

    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error(error);
    })
}

const CredentialsService = {
  Credentials
}
export default CredentialsService;

