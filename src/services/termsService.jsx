import handleResponse from './handleResponse';
import config from './config';

function getTermsContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.termsPageSlug}&populate[contentSections][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((term_content) => term_content.data[0])
    .catch((error) => {
      console.error(error);
    });
}

function getLegalNoticeContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.legalPageSlug}`, requestOptions)
    .then(handleResponse)
    .then((term_content) => {
      return term_content.data[0];
    }).catch((error) => {
      console.error(error);
    });
}

const termsService = {
  getTermsContent,
  getLegalNoticeContent,
};

export default termsService;
