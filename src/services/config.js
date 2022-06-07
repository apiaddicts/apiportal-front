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

const config = {
  apiUrl: process.env.REACT_APP_STRAPI_URL,
  suraUrl: process.env.REACT_APP_SURA_URL,
  subscriptionId: process.env.REACT_APP_SUBSCRIPTION_ID,
  resourceGroupName: process.env.REACT_APP_RESOURCE_GROUP_NAME,
  serviceName: process.env.REACT_APP_SERVICE_NAME,
  apiVersion: '2021-08-01',
  hmacAuthHeader: createSharedAccessToken('integration', process.env.REACT_APP_PRIMARY_KEY, 14),
  rememberkey: process.env.REACT_APP_REMEMBER_KEY,
};

export default config;
