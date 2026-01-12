import handleResponse from './handleResponse';
import config from './config';

function getFaq() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.faqPageSlug}&populate[contentSections][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((faq) => {
      return faq.data[0];
    }).catch((error) => {
      console.error(error);
    });
}

const faqService = {
  getFaq,
};

export default faqService;
