import handleResponse from './handleResponse';
import config from './config';

function getFaq() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=faqsSu-es&_locale=es`, requestOptions)
    .then(handleResponse)
    .then((faq) => {
      return faq;
    }).catch((error) => {
      console.error(error);
    });
}

const faqService = {
  getFaq,
};

export default faqService;
