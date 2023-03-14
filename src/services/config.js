const cryptoJs = require('crypto-js');

const createSharedAccessToken = (apimUid, apimAccessKey, expirationTime) => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + (expirationTime * 1000));

  const expiry = expiryDate.toISOString().replace(/\d+.\d+Z/, '00.0000000Z');
  const expiryShort = expiryDate.toISOString().substr(0, 16).replace(/[^\d]/g, '');

  const signature = cryptoJs.enc.Base64.stringify(cryptoJs.HmacSHA512(`${apimUid}\n${expiry}`, apimAccessKey));
  const sasToken = `SharedAccessSignature ${apimUid}&${expiryShort}&${signature}`;

  return sasToken;
};

const createUrlApimAdminAPI = () => {
  return `${process.env.REACT_APP_AZURE_APIM_URL}/subscriptions/${process.env.REACT_APP_AZURE_SUBSCRIPTION_ID}/resourceGroups/${process.env.REACT_APP_AZURE_RESOURCE_GROUP_NAME}/providers/Microsoft.ApiManagement/service/${process.env.REACT_APP_AZURE_SERVICE_NAME}`;
};

const config = {
  apiUrl: process.env.REACT_APP_STRAPI_URL,
  azureUrl: process.env.REACT_APP_AZURE_APIM_URL,
  subscriptionId: process.env.REACT_APP_AZURE_SUBSCRIPTION_ID,
  resourceGroupName: process.env.REACT_APP_AZURE_RESOURCE_GROUP_NAME,
  serviceName: process.env.REACT_APP_AZURE_SERVICE_NAME,
  apiVersion: process.env.REACT_APP_AZURE_APIM_ADMIN_API_VERSION,
  getHmacAuthHeader: () => {
    return process.env.REACT_APP_AZURE_APIM_ADMIN_API_TOKEN ? process.env.REACT_APP_AZURE_APIM_ADMIN_API_TOKEN : createSharedAccessToken(process.env.REACT_APP_AZURE_APIM_ADMIN_API_UID, process.env.REACT_APP_AZURE_APIM_ADMIN_API_PRIMARY_KEY, process.env.REACT_APP_AZURE_APIM_ADMIN_API_TOKEN_EXPIRATION_TIME);
  },
  rememberkey: process.env.REACT_APP_REMEMBER_KEY,
  topProduct: process.env.REACT_APP_LIST_PRODUCT_TOP,
  topDetail: process.env.REACT_APP_LIST_PRODUCT_APIS_TOP,
  topApi: process.env.REACT_APP_LIST_API_TOP,
  topSubscriptions: process.env.REACT_APP_LIST_SUBSCRIPTIONS,
  url: createUrlApimAdminAPI(),
  homePageSlug: process.env.REACT_APP_HOME_PAGE_SLUG,
  blogPageSlug: process.env.REACT_APP_BLOG_PAGE_SLUG,
  faqPageSlug: process.env.REACT_APP_FAQ_PAGE_SLUG,
  apisPageSlug: process.env.REACT_APP_APIS_PAGE_SLUG,
  termsPageSlug: process.env.REACT_APP_TERMS_PAGE_SLUG,
  policyPageSlug: process.env.REACT_APP_POLICY_PAGE_SLUG,
  legalPageSlug: process.env.REACT_APP_LEGAL_NOTICE_SLUG,
  locale: 'es',
  termsPath: process.env.REACT_APP_TERMS_PATH,
  policyPath: process.env.REACT_APP_POLICY_PATH,
  legalWarningPath: process.env.REACT_APP_LEGAL_NOTICE_PATH,
  notImage: '/notImage.svg',
  sendingEmailEndpointUrl: process.env.REACT_APP_SENDING_EMAIL_ENDPOINT_URL,
  contactEmailFrom: process.env.REACT_APP_EMAIL_FROM,
  contactEmailTo: process.env.REACT_APP_EMAIL_TO,
  contactEmailTemplateId: process.env.REACT_APP_CONTACT_EMAIL_TEMPLATE_ID,
  contactEmailSubject: process.env.REACT_APP_CONTACT_EMAIL_SUBJECT,
  generateStarterSubscriptionOnSignup: (process.env.REACT_APP_GENERATE_STARTER_SUBSCRIPTION_ON_SIGNUP === 'true'),
};

export default config;
