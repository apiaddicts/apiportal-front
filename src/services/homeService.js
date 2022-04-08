import handleResponse from './handleResponse';
import config from './config';

function getHome() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages/82`, requestOptions)
    .then(handleResponse)
    .then((home) => {
      return home;
    });
}

const homeService = {
  getHome,
};

export default homeService;
