import handleResponse from './handleResponse';
import config from './config';

function getApiBookStores() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${config.apiUrl}/sura-library-apis/`, requestOptions)
    .then(handleResponse)
    .then((libraries) => {
      return libraries;
    });
}

function getApiBookStore(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${config.apiUrl}/sura-library-apis/${id}`, requestOptions)
    .then(handleResponse)
    .then((library) => {
      return library;
    });
}

const libraryService = {
  getApiBookStores,
  getApiBookStore,
};

export default libraryService;
