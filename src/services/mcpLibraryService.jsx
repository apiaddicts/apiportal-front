import handleResponse from './handleResponse';
import config from './config';

function getMcpBookStores() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };
  return fetch(`${config.apiUrl}/library-mcps?populate[tags]=*&populate[image][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((libraries) => {
      return libraries;
    }).catch((error) => {
      console.error(error);
    });
}

function getMcpBookStore(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };
  return fetch(`${config.apiUrl}/library-mcps/${id}?populate[image]=true&populate[tags]=true&populate[resources]=true&populate[ratings]=true`, requestOptions)
    .then(handleResponse)
    .then((library) => {
      return library;
    }).catch((error) => {
      console.error(error);
    });
}

const libraryService = {
  getMcpBookStores,
  getMcpBookStore,
};

export default libraryService;
