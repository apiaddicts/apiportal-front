import handleResponse from './handleResponse';
import config from './config';

function getApiContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=${config.apisPageSlug}&_locale=${config.locale}`, requestOptions)
    .then(handleResponse)
    .then((api_content) => {
      return api_content[0];
    }).catch((error) => {
      console.error(error);
    });
}

const apiService = {
  getApiContent,
};

export default apiService;
