import handleResponse from './handleResponse';
import config from './config';

function getMcpContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.mcpsPageSlug}&populate[contentSections][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((mcp_content) => {
      return mcp_content.data[0];
    }).catch((error) => {
      console.error(error);
    });
}

const mcpService = {
  getMcpContent,
};

export default mcpService;
