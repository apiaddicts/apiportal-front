import handleResponse from './handleResponse';
import config from './config';

const requestOptions = () => ({
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
});

function getAgentPageContent() {
  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.agentsPageSlug}&populate[contentSections][populate]=*`, requestOptions())
    .then(handleResponse)
    .then((response) => response?.data?.[0] || {});
}

function getAgents() {
  return fetch(`${config.apiUrl}/library-agents?populate[image]=true&populate[ratings]=true&populate[protocols]=true&pagination[pageSize]=100`, requestOptions())
    .then(handleResponse)
    .then((response) => response?.data || []);
}

function getAgentBySlug(slug) {
  return fetch(`${config.apiUrl}/library-agents?filters[slug][$eq]=${slug}&populate[image]=true&populate[ratings]=true&populate[protocols]=true`, requestOptions())
    .then(handleResponse)
    .then((response) => response?.data?.[0] || null);
}

const agentLibraryService = {
  getAgentPageContent,
  getAgents,
  getAgentBySlug,
};

export default agentLibraryService;
