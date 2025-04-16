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
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5MnlsQmRRVUhBdS1yQmNBbmZGYU9uTXBWYVFGVnZ3eTJ4bENwaTVCUlNnIn0.eyJleHAiOjE3NDQ4MjkzNDIsImlhdCI6MTc0NDgyNzU0MiwianRpIjoiNzAyM2JlNzItNWFhMS00ZDQyLTg1MmItYWVlNTg2MTlmN2Q0IiwiaXNzIjoiaHR0cHM6Ly9pZHAua29wZXJuaWNhLmNsb3VkL3JlYWxtcy9uZXVyby1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDhmMTVhY2EtZjFjNS00ZGZmLWEzNzUtNTdjY2FlY2M4ZWE5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZjdmNGMzOGQ5ZmE2NGRiZTk1NTdmMTcxMGExNDhjYTMiLCJzaWQiOiI3MDgyOTExMC03ZDYxLTQ3MTMtYmYxZC01Y2M0NzRiODJjNDIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vbmV1cm9sb2d5Y2EuY29tIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW5ldXJvLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJmN2Y0YzM4ZDlmYTY0ZGJlOTU1N2YxNzEwYTE0OGNhMyI6eyJyb2xlcyI6WyI2Y2QwM2U0NC1hNjJiLTRiY2MtYTM4Yy0zZTJlNTNkNGE3NTEiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJUZXN0IFRlc3QxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJUZXN0MSIsImVtYWlsIjoiVGVzdCJ9.RSi4LdqULTa_Y_LT9dPTFYFRizXTSSNFvuSLH3Y-AjcjBkTa_aPNN3ngfAHdY5eZgy2y0tIGX4X0gukSr2tyPzkKJrxuTzhM5kyWc1zBv8dNyF2o_o7tdUmplVIhKBVTcd0AVnLtgz82nZw5vaK3QrTDheaCCUT7E34nYFirgub174Nj8arhmtb6N-LQbzMlqWFQlKe3mIEFbM3UgknnjVq-Ta17dtfEPIycnwjPXqjycjqesuBarkxCITHJUWA3i1dQahGR1oi-1CQ4KvO-750U-TnOMk2PDdrVZ4KzJi7KcV8u0WkdJ5d2ShXivoaUVbocbTQeyHiY0X4Fu3Aoew'
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
