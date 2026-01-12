import handleResponse from './handleResponse';
import config from './config';

function getPrivacyPolicyContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.policyPageSlug}&populate[contentSections][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((policy_content) => {
      return policy_content.data[0];
    }).catch((error) => {
      console.error(error);
    });
}

const policyService = {
  getPrivacyPolicyContent,
};

export default policyService;
