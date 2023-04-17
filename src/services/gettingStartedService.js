import handleResponse from './handleResponse';
import config from './config';

function gettingStarted() {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const url = `${config.apiUrl}/pages?_where[slug]=${config.startedPageSlug}&_locale=${config.locale}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response[0])
    .catch((error) => error);
}

const gettingStartedService = {
  gettingStarted,
};

export default gettingStartedService;
