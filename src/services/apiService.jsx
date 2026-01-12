import handleResponse from './handleResponse';
import config from './config';

function getApiContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.apisPageSlug}&populate[contentSections][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((api_content) => {
      return api_content.data[0];
    }).catch((error) => {
      console.error(error);
    });
}

const apiService = {
  getApiContent,
};

export default apiService;
