const config = {
  //   apiUrl: 'http://localhost:1340',
  apiUrl: process.env.REACT_APP_STRAPI_URL,
  suraUrl: process.env.SURA_URL,
  subscriptionId: process.env.SUBSCRIPTION_ID,
  resourceGroupName: process.env.RESOURCE_GROUP_NAME,
  serviceName: process.env.SERVICE_NAME,
  apiVersion: '2021-08-01',
  hmacAuthHeader: 'SharedAccessSignature integration&202206090144&mezCbWwQlNcohcjSez0cmEmhTBjc4PBgR7DGSSK5DbA1VN8m6//JxgaGZ+hSJaDFaM7u8hWk9BUS8MVpKRJ72g==',
};
export default config;
