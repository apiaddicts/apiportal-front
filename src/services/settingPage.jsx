import handleResponse from './handleResponse';
import config from './config';

function getSettingPage(locale = 'en') {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(
    `${config.apiUrl}/setting-pages?populate=*&locale=${locale}`,
    requestOptions
  )
    .then(handleResponse)
    .then((response) => response)
    .catch(console.error);
}



const settingPageService = {
  getSettingPage,

};

export default settingPageService;
