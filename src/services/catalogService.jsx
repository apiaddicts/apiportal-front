import handleResponse from './handleResponse';
import config from './config';

function getCatalogsStores() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };
  return fetch(`${config.apiUrl}/library-apis?filters[publish][$eq]=publicado&filters[openDocType][$eq]=catalog&populate[tags]=*&populate[image][populate]=*&populate[products][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((libraries) => {
      return libraries;
    }).catch((error) => {
      console.error(error);
    });
}

function getCatalogStore(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };
  return fetch(`${config.apiUrl}/library-apis/${id}?populate=image`, requestOptions)
    .then(handleResponse)
    .then((library) => {
      return library;
    }).catch((error) => {
      console.error(error);
    });
}

const catalogService = {
  getCatalogsStores,
  getCatalogStore
};

export default catalogService;