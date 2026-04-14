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

function getMcpBookStoreData(slug) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  const url = `${config.apiUrl}/library-mcps?filters[slug][$eq]=${slug}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response?.data?.[0])
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function connectMcp(slug, options = {}) {
  const { transport, headers, command, args, url } = options;
  const body = {};
  if (transport) body.transport = transport;
  if (headers && typeof headers === 'object' && Object.keys(headers).length) body.headers = headers;
  if (command) body.command = command;
  if (Array.isArray(args) && args.length) body.args = args;
  if (url) body.url = url;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
    body: JSON.stringify(body),
  };

  return fetch(`${config.apiUrl}/library-mcps/${slug}/connect`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

const libraryService = {
  getMcpBookStores,
  getMcpBookStore,
  getMcpBookStoreData,
  connectMcp,
};

export default libraryService;
