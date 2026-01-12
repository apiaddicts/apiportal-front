import handleResponse from './handleResponse';
import config from './config';



function getcodeSample(id_integrationApi) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/code-samples?filters[library_api][title][$eq]=${id_integrationApi}&populate=*`, requestOptions)
    .then(handleResponse)
    .then((blog) => {
      return blog;
    }).catch((error) => {
      console.error(error);
    });
}

const CodeSampleService = {

  getcodeSample,

};

export default CodeSampleService;
