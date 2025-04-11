import handleResponse from './handleResponse';
import config from './config';

function getFaq() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=${config.faqPageSlug}&_locale=${config.locale}`, requestOptions)
    .then(handleResponse)
    .then((faq) => {
      return faq[0];
    }).catch((error) => {
      console.error(error);
    });
}

const faqService = {
  getFaq,
};

export default faqService;
