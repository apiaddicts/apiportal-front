import handleResponse from './handleResponse';
import config from './config';

function getPrivacyPolicyContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/pages?_where[slug]=${config.policyPageSlug}&_locale=${config.locale}`, requestOptions)
    .then(handleResponse)
    .then((policy_content) => {
      return policy_content[0];
    }).catch((error) => {
      console.error(error);
    });
}

const policyService = {
  getPrivacyPolicyContent,
};

export default policyService;
