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
      'client_id': 'ab5481325055405a97fcc7a826fac919',
      'client_secret': '08f5c7b4aE194eCaBF7E33c990Ca7504',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  };
  const url = 'http://localhost:5000/sys/users/v1/users/credentials';

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
  // const userCredential = getUsersCredentials()
  // console.log('userCredential', userCredential);



  const headers = {
    'client_id': 'f7f4c38d9fa64dbe9557f1710a148ca3',
    'client_secret': '051f2478200544Aa9F5149b411Bd1aDA',
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
