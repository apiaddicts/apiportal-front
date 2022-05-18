const config = {
  //   apiUrl: 'http://localhost:1340',
  apiUrl: process.env.REACT_APP_STRAPI_URL,
  suraUrl: process.env.REACT_APP_SURA_URL,
  subscriptionId: process.env.REACT_APP_SUBSCRIPTION_ID,
  resourceGroupName: process.env.REACT_APP_RESOURCE_GROUP_NAME,
  serviceName: process.env.REACT_APP_SERVICE_NAME,
  apiVersion: "2021-08-01",
  hmacAuthHeader: "SharedAccessSignature integration&202206090144&mezCbWwQlNcohcjSez0cmEmhTBjc4PBgR7DGSSK5DbA1VN8m6//JxgaGZ+hSJaDFaM7u8hWk9BUS8MVpKRJ72g==",
};
export default config;
