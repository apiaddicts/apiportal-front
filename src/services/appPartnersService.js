import handleResponse from './handleResponse';
import config from './config';

function getAppPartnersContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=${config.appPartnersPageSlug}&_locale=${config.locale}`, requestOptions)
    .then(handleResponse)
    .then((app_partners) => {
      return app_partners[0];
    }).catch((error) => {
      console.error(error);
    });
}

const appPartnersService = {
  getAppPartnersContent,
};

export default appPartnersService;
