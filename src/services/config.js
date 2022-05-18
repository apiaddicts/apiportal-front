const config = {
  //   apiUrl: 'http://localhost:1340',
  apiUrl: process.env.REACT_APP_STRAPI_URL,
  suraUrl: process.env.REACT_APP_SURA_URL,
  subscriptionId: process.env.REACT_APP_SUBSCRIPTION_ID,
  resourceGroupName: process.env.REACT_APP_RESOURCE_GROUP_NAME,
  serviceName: process.env.REACT_APP_SERVICE_NAME,
  apiVersion: process.env.REACT_APP_API_VERSION,
  hmacAuthHeader: process.env.REACT_APP_HMAC_AUTH_HEADER,
};
export default config;
