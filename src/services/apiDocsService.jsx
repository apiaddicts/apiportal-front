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
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5MnlsQmRRVUhBdS1yQmNBbmZGYU9uTXBWYVFGVnZ3eTJ4bENwaTVCUlNnIn0.eyJleHAiOjE3NDUyNDU4NzUsImlhdCI6MTc0NTI0NDA3NSwianRpIjoiZDU4NWRiNmYtNGMwMy00OWQxLWJlYmQtYTUyMThkOTQ4ZTZkIiwiaXNzIjoiaHR0cHM6Ly9pZHAua29wZXJuaWNhLmNsb3VkL3JlYWxtcy9uZXVyby1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDhmMTVhY2EtZjFjNS00ZGZmLWEzNzUtNTdjY2FlY2M4ZWE5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZjdmNGMzOGQ5ZmE2NGRiZTk1NTdmMTcxMGExNDhjYTMiLCJzaWQiOiI4YzE4NDEwMS1jYTk4LTRmNDQtODRlMi1jYzFhMDBmODZjYzIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vbmV1cm9sb2d5Y2EuY29tIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW5ldXJvLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJmN2Y0YzM4ZDlmYTY0ZGJlOTU1N2YxNzEwYTE0OGNhMyI6eyJyb2xlcyI6WyI2Y2QwM2U0NC1hNjJiLTRiY2MtYTM4Yy0zZTJlNTNkNGE3NTEiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJUZXN0IFRlc3QxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJUZXN0MSIsImVtYWlsIjoiVGVzdCJ9.Eu_f17KFSuKR4R6wQ7tFJH4_zSLy2-fuLctNQemVlHnj1OGB7bsdjXPpjXXqhWrPUHER0bez15fUThAuWJa4Pqq_9xWp6tMQbnuukx250CjhU0EQLYvg_L3mP50dFeY0PeI9TMazDCkUPxkqldBHaJj2iHbm6u4dEP45X7yOs8qVyFGIwBCHHWma3Qn6DuilMXQ9eY5r6VRzYTrbrNELH4Xd8U_lpg19hlrw07yP8ukBRwf6rK5x3rDoH2C2vO23dmFwv12lRaruhNHyNM_9tWBj9fNTP99T0pZY3O9jrGgCgwY_BENuQK8XcqV_ps9bgVHwNkI82PtwSOEwoOiq8Q'
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
