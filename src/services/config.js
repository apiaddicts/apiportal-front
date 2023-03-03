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
  hmacAuthHeader: process.env.REACT_APP_AZURE_APIM_ADMIN_API_TOKEN ? process.env.REACT_APP_AZURE_APIM_ADMIN_API_TOKEN : createSharedAccessToken(process.env.REACT_APP_AZURE_APIM_ADMIN_API_UID, process.env.REACT_APP_AZURE_APIM_ADMIN_API_PRIMARY_KEY, process.env.REACT_APP_AZURE_APIM_ADMIN_API_TOKEN_VALID_DAYS),
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
  emailUrl: process.env.REACT_APP_EMAIL_ENDPOINT,
  apiKeySendGrid: process.env.REACT_APP_API_KEY_SEND_GRID,
  subscriptionKey: process.env.REACT_APP_EMAIL_SUBSCRIPTION_KEY,
  emailFrom: process.env.REACT_APP_EMAIL_FROM,
  emailTo: process.env.REACT_APP_EMAIL_TO,
  emailContactTemplateId: process.env.REACT_APP_EMAIL_CONTACT_TEMPLATE_ID,
  emailConversationTemplateId: process.env.REACT_APP_EMAIL_CONVERSATION_TEMPLATE_ID,
  locale: 'es',
  termsPath: '/user/terms',
  policyPath: '/user/policy-privacy',
  notImage: '/notImage.svg',
  apimUrl: process.env.REACT_APP_APIM_URL,
  adminId: process.env.REACT_APP_ADMIN_GROUP_ID,
};

export default config;
