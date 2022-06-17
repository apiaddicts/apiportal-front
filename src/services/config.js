const cryptoJs = require('crypto-js');

const createSharedAccessToken = (apimUid, apimAccessKey, validDays) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + validDays);

  const expiry = expiryDate.toISOString().replace(/\d+.\d+Z/, '00.0000000Z');
  const expiryShort = expiryDate.toISOString().substr(0, 16).replace(/[^\d]/g, '');

  const signature = cryptoJs.enc.Base64.stringify(cryptoJs.HmacSHA512(`${apimUid}\n${expiry}`, apimAccessKey));
  const sasToken = `SharedAccessSignature ${apimUid}&${expiryShort}&${signature}`;

  return sasToken;
};

const createURLSura = () => {
  return `${process.env.REACT_APP_SURA_URL}/subscriptions/${process.env.REACT_APP_SUBSCRIPTION_ID}/resourceGroups/${process.env.REACT_APP_RESOURCE_GROUP_NAME}/providers/Microsoft.ApiManagement/service/${process.env.REACT_APP_SERVICE_NAME}`;
};

const config = {
  apiUrl: process.env.REACT_APP_STRAPI_URL,
  suraUrl: process.env.REACT_APP_SURA_URL,
  subscriptionId: process.env.REACT_APP_SUBSCRIPTION_ID,
  resourceGroupName: process.env.REACT_APP_RESOURCE_GROUP_NAME,
  serviceName: process.env.REACT_APP_SERVICE_NAME,
  apiVersion: process.env.REACT_APP_API_VERSION,
  hmacAuthHeader: createSharedAccessToken(process.env.REACT_APP_APIM_UID, process.env.REACT_APP_PRIMARY_KEY, process.env.REACT_APP_TOKEN_VALID_DAYS),
  rememberkey: process.env.REACT_APP_REMEMBER_KEY,
  topProduct: process.env.REACT_APP_LIST_PRODUCT_TOP,
  topDetail: process.env.REACT_APP_LIST_PRODUCT_APIS_TOP,
  topApi: process.env.REACT_APP_LIST_API_TOP,
  topSubscriptions: process.env.REACT_APP_LIST_SUBSCRIPTIONS,
  url: createURLSura(),
};

export default config;
