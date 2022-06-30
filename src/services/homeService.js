import handleResponse from './handleResponse';
import config from './config';

function getHome() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=HomeSu-es&_locale=es`, requestOptions)
    .then(handleResponse)
    .then((home) => {
      return home;
    }).catch((error) => {
      console.error(error);
    });
}

const homeService = {
  getHome,
};

export default homeService;
