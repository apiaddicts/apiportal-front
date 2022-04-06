import handleResponse from './handleResponse';

function getHome() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch('http://localhost:1340/pages/82', requestOptions)
    .then(handleResponse)
    .then((home) => {
      return home;
    });
}

const homeService = {
  getHome,
};

export default homeService;
