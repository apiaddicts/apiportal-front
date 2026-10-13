import agentLibraryConstants from '../constants/agentLibraryConstants';

const initialState = {
  agentPage: null,
  backUpAgentLibraries: [],
  agentLibraries: null,
  loadingAgentLibraries: false,
  errorAgentLibraries: {},
  filters: {},
  sort: 'asc',
  agentLibraryBySlug: null,
  loadingAgentLibraryBySlug: false,
  errorAgentLibraryBySlug: {},
};

// eslint-disable-next-line default-param-last
export default function agentLibraryReducer(state = initialState, action) {
  switch (action.type) {
    case agentLibraryConstants.GET_AGENT_PAGE_SUCCESS:
      return {
        ...state,
        agentPage: action.payload,
      };
    case agentLibraryConstants.GET_AGENT_PAGE_FAILURE:
      return {
        ...state,
        agentPage: {},
      };
    case agentLibraryConstants.GET_ALL_AGENT_LIBRARY_REQUEST:
      return {
        ...state,
        loadingAgentLibraries: true,
      };
    case agentLibraryConstants.GET_ALL_AGENT_LIBRARY_SUCCESS:
      return {
        ...state,
        backUpAgentLibraries: action.payload,
        agentLibraries: action.payload,
        loadingAgentLibraries: false,
        errorAgentLibraries: {},
        filters: {},
        sort: 'asc',
      };
    case agentLibraryConstants.GET_ALL_AGENT_LIBRARY_FAILURE:
      return {
        ...state,
        backUpAgentLibraries: [],
        agentLibraries: [],
        loadingAgentLibraries: false,
        errorAgentLibraries: action.payload,
      };
    case agentLibraryConstants.GET_AGENT_LIBRARY_BY_SLUG_REQUEST:
      return {
        ...state,
        agentLibraryBySlug: null,
        loadingAgentLibraryBySlug: true,
        errorAgentLibraryBySlug: {},
      };
    case agentLibraryConstants.GET_AGENT_LIBRARY_BY_SLUG_SUCCESS:
      return {
        ...state,
        agentLibraryBySlug: action.payload,
        loadingAgentLibraryBySlug: false,
        errorAgentLibraryBySlug: {},
      };
    case agentLibraryConstants.GET_AGENT_LIBRARY_BY_SLUG_FAILURE:
      return {
        ...state,
        agentLibraryBySlug: null,
        loadingAgentLibraryBySlug: false,
        errorAgentLibraryBySlug: action.payload,
      };
    case agentLibraryConstants.FILTER_ALL_AGENT_LIBRARY:
      return {
        ...state,
        agentLibraries: action.data,
        filters: action.newFilters,
        sort: action.sort,
      };
    case agentLibraryConstants.RESET_AGENT_LIBRARY:
      return {
        ...state,
        agentLibraries: state.backUpAgentLibraries,
        filters: {},
        sort: 'asc',
      };
    default:
      return state;
  }
}
