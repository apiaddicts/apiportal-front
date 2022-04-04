import handleResponse from './handleResponse';

function getHome() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch('https://pre-strapi-climatetrade.cloudappi.net/success-stories', requestOptions)
    .then(handleResponse)
    .then((home) => {
      return home;
    });
}

const homeService = {
  getHome,
};

export default homeService;
