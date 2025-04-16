import handleResponse from './handleResponse';
import config from './config';

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
  const headers = {
    'client_id': 'f7f4c38d9fa64dbe9557f1710a148ca3',
    'client_secret': '051f2478200544Aa9F5149b411Bd1aDA',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5MnlsQmRRVUhBdS1yQmNBbmZGYU9uTXBWYVFGVnZ3eTJ4bENwaTVCUlNnIn0.eyJleHAiOjE3NDQ4MjcwNjcsImlhdCI6MTc0NDgyNTI2NywianRpIjoiZWIzNDk2NzUtYWJhZC00YTczLTgxM2QtZTBhY2VlMzZkMDQ2IiwiaXNzIjoiaHR0cHM6Ly9pZHAua29wZXJuaWNhLmNsb3VkL3JlYWxtcy9uZXVyby1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDhmMTVhY2EtZjFjNS00ZGZmLWEzNzUtNTdjY2FlY2M4ZWE5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZjdmNGMzOGQ5ZmE2NGRiZTk1NTdmMTcxMGExNDhjYTMiLCJzaWQiOiI0ZmJlMzMyMi0xODY2LTQyMTUtOGU3Ni0wYjJkMmRhNjE0YzUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vbmV1cm9sb2d5Y2EuY29tIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW5ldXJvLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJmN2Y0YzM4ZDlmYTY0ZGJlOTU1N2YxNzEwYTE0OGNhMyI6eyJyb2xlcyI6WyI2Y2QwM2U0NC1hNjJiLTRiY2MtYTM4Yy0zZTJlNTNkNGE3NTEiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJUZXN0IFRlc3QxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJUZXN0MSIsImVtYWlsIjoiVGVzdCJ9.RkkHzkJqSdRoiDqJhGTXy7Jaj_hResDXrDVGBpqTc60QcI8QOMRUKe3Zi3qgBzT5pUJSpZIWFJtvRvX-d0ZA002l2ayjw2IFRlFKQlxcNYd7jOKWI1YA-wF7y_V4chPN-EoYOv8Oxm2CbTcHvAEsMMvlgH1BL6OyiYR-BFBgu90lsfboq73n1AGVeQjNn9pAV-6IyXspq62KZ6JswozPKhR8E44N4UpPYcTSArLHdpBmIQIEEgzLKt3_jx8_lNczXbdzkYvKhfmIlZIRXaZ8zIdqYyeVa-1Dvo044u9mTxPaYzO7q8d9DphMSTbsoN4xHKjNpIcBPFZATvrQpJoD7A'
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
};

export default apiFaceAiService;
