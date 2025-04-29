import handleResponse from './handleResponse';
import config from './config';

export function getAccessToken() {
  const token = sessionStorage.getItem('token');
  return token ? JSON.parse(token).accessToken : null;
}


function getUsersCredentials() {
  const token = getAccessToken();
  const requestOptions = {
    method: 'GET',
    headers: {
      'client_id': config.clientIdFace,
      'client_secret': config.clientSecretFace,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  };
  const url = config.urlFaceAi;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
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
 * @param {string} imageBase64
 * @returns {Promise<any>}
 */
function processFaceImage(imageBase64) {

  const token = getAccessToken();




  const headers = {
    'client_id': config.clientIdFace,
    'client_secret': config.clientSecretFace,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const body = JSON.stringify({
    image: imageBase64,
    models: {
      bboxes: 'dlib',
      landmarks: 'mediapipe',
      emotions: 'ferKpN',
      kpiEmotional: 'default',
      kpiAttentional: 'default',
      kpiComposed: 'default'
    }
  });

  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };



  const url = config.urlFaceAi;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);


}

const apiFaceAiService = {
  convertImageToBase64,
  processFaceImage,
  getUsersCredentials
};

export default apiFaceAiService;
