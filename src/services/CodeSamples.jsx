import handleResponse from './handleResponse';
import config from './config';



function getcodeSample(id_integrationApi) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/code-samples?filters[id_integrationApi][$eq]=${id_integrationApi}&populate=*`, requestOptions)
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
