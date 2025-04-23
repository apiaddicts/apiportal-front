import handleResponse from './handleResponse';
import config from './config';



function getcodeSample(libraryId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/code-samples?filters[id_libraryApi][$eq]=${libraryId}&populate=*`, requestOptions)
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
