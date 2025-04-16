import { cryptoJs } from 'crypto-js'

const createSharedAccessToken = (apimUid, apimAccessKey, expirationTime) => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + (Number(expirationTime) * 1000));

  const expiry = expiryDate.toISOString().replace(/\d+.\d+Z/, '00.0000000Z');
  const expiryShort = expiryDate.toISOString().substr(0, 16).replace(/[^\d]/g, '');

  const signature = cryptoJs.enc.Base64.stringify(cryptoJs.HmacSHA512(`${apimUid}\n${expiry}`, apimAccessKey));
  const sasToken = `SharedAccessSignature ${apimUid}&${expiryShort}&${signature}`;

  return sasToken;
};

const createUrlApimAdminAPI = () => {
  return `${import.meta.env.VITE_APP_AZURE_APIM_URL}/subscriptions/${import.meta.env.VITE_APP_AZURE_SUBSCRIPTION_ID}/resourceGroups/${import.meta.env.VITE_APP_AZURE_RESOURCE_GROUP_NAME}/providers/Microsoft.ApiManagement/service/${import.meta.env.VITE_APP_AZURE_SERVICE_NAME}`;
};

export const enumStatus = [
  { value: 'active', text: 'Aprobado', disabled: false },
  { value: 'blocked', text: 'Bloqueado', disabled: false },
  { value: 'pending', text: 'Pendiente', disabled: true },
];

export const compareArrays = (a, b) => {
  return a.filter((x) => {
    return !b.some((y) => {
      return x.value === y.name;
    });
  });
};

const config = {
  apiUrl: import.meta.env.VITE_APP_STRAPI_URL,
  azureUrl: import.meta.env.VITE_APP_AZURE_APIM_URL,
  subscriptionId: import.meta.env.VITE_APP_AZURE_SUBSCRIPTION_ID,
  resourceGroupName: import.meta.env.VITE_APP_RESOURCE_GROUP_NAME,
  serviceName: import.meta.env.VITE_APP_SERVICE_NAME,
  apiVersion: import.meta.env.VITE_APP_AZURE_APIM_ADMIN_API_VERSION,
  getHmacAuthHeader: () => {
    return import.meta.env.VITE_APP_AZURE_APIM_ADMIN_API_TOKEN ? import.meta.env.VITE_APP_AZURE_APIM_ADMIN_API_TOKEN : createSharedAccessToken(import.meta.env.VITE_APP_AZURE_APIM_ADMIN_API_UID, import.meta.env.VITE_APP_AZURE_APIM_ADMIN_API_PRIMARY_KEY, import.meta.env.VITE_APP_AZURE_APIM_ADMIN_API_TOKEN_EXPIRATION_TIME);
  },
  rememberkey: import.meta.env.VITE_APP_REMEMBER_KEY,
  topProduct: import.meta.env.VITE_APP_LIST_PRODUCT_TOP,
  topDetail: import.meta.env.VITE_APP_LIST_PRODUCT_APIS_TOP,
  topApi: import.meta.env.VITE_APP_LIST_API_TOP,
  topApps: import.meta.env.VITE_APP_LIST_APPS,
  topSubscriptions: import.meta.env.VITE_APP_LIST_SUBSCRIPTIONS,
  topGroup: import.meta.env.VITE_APP_LIST_GROUP_TOP,
  topUser: import.meta.env.VITE_APP_LIST_USER_TOP,
  url: createUrlApimAdminAPI(),
  homePageSlug: import.meta.env.VITE_APP_HOME_PAGE_SLUG,
  appPartnersPageSlug: import.meta.env.VITE_APP_APPPARTNERS_PAGE_SLUG,
  blogPageSlug: import.meta.env.VITE_APP_BLOG_PAGE_SLUG,
  faqPageSlug: import.meta.env.VITE_APP_FAQ_PAGE_SLUG,
  apisPageSlug: import.meta.env.VITE_APP_APIS_PAGE_SLUG,
  termsPageSlug: import.meta.env.VITE_APP_TERMS_PAGE_SLUG,
  policyPageSlug: import.meta.env.VITE_APP_POLICY_PAGE_SLUG,
  startedPageSlug: import.meta.env.VITE_APP_STARTED_PAGE_SLUG,
  legalPageSlug: import.meta.env.VITE_APP_LEGAL_NOTICE_SLUG,
  emailUrl: import.meta.env.VITE_APP_SENDING_EMAIL_ENDPOINT_URL,
  apiKeySendGrid: import.meta.env.VITE_APP_API_KEY_SEND_GRID,
  subscriptionKey: import.meta.env.VITE_APP_EMAIL_SUBSCRIPTION_KEY,
  emailFrom: import.meta.env.VITE_APP_EMAIL_FROM,
  emailTo: import.meta.env.VITE_APP_EMAIL_TO,
  emailContactTemplateId: import.meta.env.VITE_APP_EMAIL_CONTACT_TEMPLATE_ID,
  emailConversationTemplateId: import.meta.env.VITE_APP_EMAIL_CONVERSATION_TEMPLATE_ID,
  contactEmailSubject: import.meta.env.VITE_APP_CONTACT_EMAIL_SUBJECT,
  locale: 'es',
  termsPath: import.meta.env.VITE_APP_TERMS_PATH,
  privacyPolicyPath: import.meta.env.VITE_APP_PRIVACY_POLICY_PATH,
  cookiesPolicyPath: import.meta.env.VITE_APP_COOKIES_POLICY_PATH,
  legalWarningPath: import.meta.env.VITE_APP_LEGAL_NOTICE_PATH,
  policyPath: import.meta.env.VITE_APP_COOKIES_POLICY_PATH,
  notImage: '/no-image.jpeg',
  apimUrl: import.meta.env.VITE_APP_APIM_URL,
  adminId: import.meta.env.VITE_APP_ADMIN_GROUP_ID,
  sendingEmailEndpointUrl: import.meta.env.VITE_APP_SENDING_EMAIL_ENDPOINT_URL,
  contactEmailFrom: import.meta.env.VITE_APP_EMAIL_FROM,
  contactEmailTo: import.meta.env.VITE_APP_EMAIL_TO,
  contactEmailTemplateId: import.meta.env.VITE_APP_EMAIL_CONTACT_TEMPLATE_ID,
  generateStarterSubscriptionOnSignup: (import.meta.env.VITE_APP_GENERATE_STARTER_SUBSCRIPTION_ON_SIGNUP === 'true'),
  urlFaceAi: import.meta.env.VITE_APP_FACE_AI,
};

export default config;
