import handleResponse from './handleResponse';
import config from './config';

function getHomeContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=${config.homePageSlug}&_locale=${config.locale}`, requestOptions)
    .then(handleResponse)
    .then((home) => {
      return home[0];
    }).catch((error) => {
      console.error(error);
    });
}

const homeService = {
  getHomeContent,
};

export default homeService;
