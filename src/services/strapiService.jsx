import handleResponse from './handleResponse';

import config from './config';


function getApimConfig(){
  const requestOptions = {
    method: 'GET',
  }
  const url = `${config.apiUrl}/apim-configs`;

  return fetch(url,requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
    })
}

const strapiService = {
  getApimConfig
}

export default strapiService;