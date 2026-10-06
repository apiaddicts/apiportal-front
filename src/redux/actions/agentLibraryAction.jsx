/* eslint-disable no-prototype-builtins */
import agentLibraryConstants from '../constants/agentLibraryConstants';
import agentLibraryService from '../../services/agentLibraryService';

import store from '../store';

const PROTOCOL_ORDER = ['API', 'A2A', 'A2UI'];

const asArray = (value) => (Array.isArray(value) ? value : []);
const unique = (values) => [...new Set(values.filter(Boolean))];

const sortingValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
};

// A2A agent cards: v1.0 declares `supportedInterfaces`, v0.3 a top-level `url` plus transport.
const getCardInterfaces = (card) => {
  if (asArray(card.supportedInterfaces).length > 0) {
    return asArray(card.supportedInterfaces).map((item) => ({
      url: item?.url || '',
      binding: item?.protocolBinding || '',
      protocolVersion: item?.protocolVersion || '',
    }));
  }

  const main = card.url
    ? [{ url: card.url, binding: card.preferredTransport || card.transport || 'JSONRPC', protocolVersion: card.protocolVersion || '' }]
    : [];
  const additional = asArray(card.additionalInterfaces).map((item) => ({
    url: item?.url || '',
    binding: item?.transport || '',
    protocolVersion: card.protocolVersion || '',
  }));
  return [...main, ...additional];
};

// JSONRPC/GRPC bindings are A2A, HTTP/REST ones are API; A2UI is declared as an extension or output mode.
const getCardProtocols = (card, interfaces) => {
  const protocols = interfaces.map(({ binding }) => {
    if (/JSONRPC|JSON-RPC|GRPC/i.test(binding)) return 'A2A';
    if (/HTTP|REST/i.test(binding)) return 'API';
    return null;
  });
  const a2ui = asArray(card.capabilities?.extensions).some((ext) => /a2ui/i.test(ext?.uri || ''))
    || asArray(card.defaultOutputModes).some((mode) => /a2ui/i.test(mode));
  if (a2ui) protocols.push('A2UI');
  return PROTOCOL_ORDER.filter((protocol) => protocols.includes(protocol));
};

// Reads the agent card of a CMS entry. Fields edited in the CMS win over the card.
const toAgent = (entry) => {
  if (!entry) return null;
  const card = entry.agentCard && typeof entry.agentCard === 'object' ? entry.agentCard : {};
  const interfaces = getCardInterfaces(card);
  const protocols = getCardProtocols(card, interfaces);
  const capabilities = card.capabilities || {};
  const skills = asArray(card.skills).map((skill) => ({
    id: skill?.id || '',
    name: skill?.name || '',
    description: skill?.description || '',
    tags: asArray(skill?.tags),
    examples: asArray(skill?.examples),
  }));
  const skillTags = unique(skills.flatMap((skill) => skill.tags));

  return {
    ...entry,
    title: entry.title || card.name || '',
    description: entry.description || card.description || '',
    version: entry.version || card.version || '',
    globalRating: entry.ratings?.globalRating || '',
    specVersion: asArray(card.supportedInterfaces).length > 0 ? '1.0' : '0.3',
    provider: card.provider?.organization || '',
    documentationUrl: card.documentationUrl || '',
    interfaces,
    protocols,
    capabilities: {
      streaming: capabilities.streaming === true,
      pushNotifications: capabilities.pushNotifications === true,
      taskHistory: capabilities.stateTransitionHistory === true,
    },
    inputModes: asArray(card.defaultInputModes),
    skills,
    skillTags,
    // Chips shown by the shared library card.
    tags: protocols.map((protocol) => ({ label: protocol, class: `protocol-${protocol.toLowerCase()}` })),
  };
};

const lower = (values) => values.map((value) => value.toLowerCase());

const filterAgents = (agents, filters) => agents.filter((item) => {
  const conditions = [];
  Object.keys(filters).forEach((key) => {
    if (key === 'version') {
      conditions.push((filters.version.length) ? filters.version.includes(item.version.toLowerCase()) : true);
    }
    if (key === 'protocol') {
      conditions.push((filters.protocol.length) ? filters.protocol.some((protocol) => lower(item.protocols).includes(protocol)) : true);
    }
    if (key === 'globalRating') {
      conditions.push((filters.globalRating.length) ? filters.globalRating.includes(item.globalRating.toLowerCase()) : true);
    }
    if (key === 'search') {
      conditions.push((filters.search.length) ? item.title.toLowerCase().includes(filters.search) : true);
    }
  });
  return conditions.every((v) => v === true);
});

export const getAgentPageContent = () => (dispatch) => {
  dispatch({ type: agentLibraryConstants.GET_AGENT_PAGE_REQUEST });
  agentLibraryService.getAgentPageContent().then(
    (page) => {
      dispatch({
        type: agentLibraryConstants.GET_AGENT_PAGE_SUCCESS,
        payload: page,
      });
    },
    (error) => {
      dispatch({
        type: agentLibraryConstants.GET_AGENT_PAGE_FAILURE,
        payload: error,
      });
    },
  );
};

export const getAgentLibraries = () => (dispatch) => {
  dispatch({ type: agentLibraryConstants.GET_ALL_AGENT_LIBRARY_REQUEST });
  agentLibraryService.getAgents().then(
    (agents) => {
      dispatch({
        type: agentLibraryConstants.GET_ALL_AGENT_LIBRARY_SUCCESS,
        payload: agents.map(toAgent).sort(sortingValues('title')),
      });
    },
    (error) => {
      dispatch({
        type: agentLibraryConstants.GET_ALL_AGENT_LIBRARY_FAILURE,
        payload: error,
      });
    },
  );
};

export const getAgentLibraryBySlug = (slug) => (dispatch) => {
  dispatch({ type: agentLibraryConstants.GET_AGENT_LIBRARY_BY_SLUG_REQUEST });
  agentLibraryService.getAgentBySlug(slug).then(
    (agent) => {
      dispatch({
        type: agentLibraryConstants.GET_AGENT_LIBRARY_BY_SLUG_SUCCESS,
        payload: toAgent(agent),
      });
    },
    (error) => {
      dispatch({
        type: agentLibraryConstants.GET_AGENT_LIBRARY_BY_SLUG_FAILURE,
        payload: error,
      });
    },
  );
};

export const sortAgentCollection = (sort) => (dispatch) => {
  const { agentLibraries, filters } = store.getState().agentLibrary;
  dispatch({
    type: agentLibraryConstants.FILTER_ALL_AGENT_LIBRARY,
    data: [...(agentLibraries || [])].sort(sortingValues('title', sort)),
    newFilters: filters,
    sort,
  });
};

// Same behaviour as the MCP catalog: `checked == null` sets a text filter, otherwise the value is toggled.
export const filterAgentCheck = (label, checked, name) => (dispatch) => {
  const { filters, backUpAgentLibraries, sort } = store.getState().agentLibrary;
  const value = String(label).toLowerCase().trim();
  const newFilters = { ...filters };

  if (checked == null) {
    newFilters[name] = value;
  } else if (checked) {
    newFilters[name] = [...(newFilters[name] || []).filter((item) => item !== value), value];
  } else {
    newFilters[name] = (newFilters[name] || []).filter((item) => item !== value);
  }

  dispatch({
    type: agentLibraryConstants.FILTER_ALL_AGENT_LIBRARY,
    data: filterAgents(backUpAgentLibraries, newFilters).sort(sortingValues('title', sort)),
    newFilters,
    sort,
  });
};

export const resetAgentLibrary = () => (dispatch) => {
  dispatch({ type: agentLibraryConstants.RESET_AGENT_LIBRARY });
};
