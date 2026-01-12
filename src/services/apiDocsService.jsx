import handleResponse from './handleResponse';
import config from './config';

export function getAccessToken() {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token).accessToken : null;
}




/**
 * 
 * @param {File} file 
 * @returns {Promise<string>} 
 */
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * 
 * @param {Object} payload 
 * @returns {Promise<any>}
 */
function processFaceImage(payload) {
  const token = getAccessToken();

  const headers = {
    'client_id': config.clientIdFace,
    'client_secret': config.clientSecretFace,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  };

  const url = config.urlFaceAi;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);

}

const apiFaceAiService = {
  convertImageToBase64,
  processFaceImage
};

export default apiFaceAiService;
