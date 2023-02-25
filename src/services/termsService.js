import handleResponse from './handleResponse';
import config from './config';

function getTermsContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=${config.termsPageSlug}&_locale=${config.locale}`, requestOptions)
    .then(handleResponse)
    .then((term_content) => {
      return term_content[0];
    }).catch((error) => {
      console.error(error);
    });
}

function getLegalNoticeContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=${config.legalPageSlug}&_locale=${config.locale}`, requestOptions)
    .then(handleResponse)
    .then((term_content) => {
      return term_content[0];
    }).catch((error) => {
      console.error(error);
    });
}

const termsService = {
  getTermsContent,
  getLegalNoticeContent,
};

export default termsService;
