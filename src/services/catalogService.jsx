import handleResponse from './handleResponse';
import config from './config';

function getCatalogContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.catalogsPageSlug}&populate[contentSections][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((catalog_content) => {
      return catalog_content.data[0];
    }).catch((error) => {
      console.error(error);
    });
}

function getCatalogsStores() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };
  return fetch(`${config.apiUrl}/library-catalogs?filters[publish][$eq]=publicado&populate[tags]=*&populate[image][populate]=*`, requestOptions)
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
  return fetch(`${config.apiUrl}/library-catalogs/${id}?populate=image`, requestOptions)
    .then(handleResponse)
    .then((library) => {
      return library;
    }).catch((error) => {
      console.error(error);
    });
}

const catalogService = {
  getCatalogsStores,
  getCatalogStore,
  getCatalogContent
};

export default catalogService;