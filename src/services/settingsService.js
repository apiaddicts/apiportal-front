import handleResponse from './handleResponse';
import config from './config';

function getSettingsContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch('http://localhost:1337/settings', requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

const settingsService = {
  getSettingsContent,
};

export default settingsService;
