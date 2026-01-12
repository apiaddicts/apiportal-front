import handleResponse from './handleResponse';
import config from './config';

function getSettingPage() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };


  return fetch(`${config.apiUrl}/setting-pages?populate=*`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}



const settingPageService = {
  getSettingPage,

};

export default settingPageService;
