import handleResponse from './handleResponse';
import config from './config';

function getFaq() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages/84`, requestOptions)
    .then(handleResponse)
    .then((faq) => {
      return faq;
    });
}

const faqService = {
  getFaq,
};

export default faqService;
