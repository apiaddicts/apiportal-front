import mcpLibraryConstants from '../constants/mcpLibraryConstants';

const initialState = {
  backUpMcpLibraries: [],
  mcpLibraries: null,
  errorMcpLibraries: {},
  loadingMcpLibraries: false,
  filters: {},
  mcpLibrary: {},
  errorMcpLibrary: {},
  mcpLibraryBySlug: null,
  loadingMcpLibraryBySlug: false,
  errorMcpLibraryBySlug: {},
  sort: 'asc',
  selectedMcps: [],
};

// eslint-disable-next-line default-param-last
export default function mcpLibraryReducer(state = initialState, action) {
  switch (action.type) {
    case mcpLibraryConstants.GET_ALL_MCP_LIBRARY_REQUEST:
      return {
        ...state,
        loadingMcpLibraries: true,
      };
    case mcpLibraryConstants.GET_ALL_MCP_LIBRARY_SUCCESS:
      return {
        ...state,
        backUpMcpLibraries: action.payload,
        mcpLibraries: action.payload,
        loadingMcpLibraries: false,
        errorMcpLibraries: {},
      };
    case mcpLibraryConstants.GET_ALL_MCP_LIBRARY_FAILURE:
      return {
        ...state,
        backUpMcpLibraries: [],
        mcpLibraries: [],
        loadingMcpLibraries: false,
        errorMcpLibraries: action.payload,
      };
    case mcpLibraryConstants.GET_MCP_LIBRARY_SUCCESS:
      return {
        ...state,
        mcpLibrary: action.payload,
        errorMcpLibrary: {},
      };
    case mcpLibraryConstants.GET_MCP_LIBRARY_FAILURE:
      return {
        ...state,
        mcpLibrary: {},
        errorMcpLibrary: action.payload,
      };
    case mcpLibraryConstants.GET_MCP_LIBRARY_BY_SLUG_REQUEST:
      return {
        ...state,
        loadingMcpLibraryBySlug: true,
        mcpLibraryBySlug: null,
        errorMcpLibraryBySlug: {},
      };
    case mcpLibraryConstants.GET_MCP_LIBRARY_BY_SLUG_SUCCESS:
      return {
        ...state,
        mcpLibraryBySlug: action.payload,
        loadingMcpLibraryBySlug: false,
        errorMcpLibraryBySlug: {},
      };
    case mcpLibraryConstants.GET_MCP_LIBRARY_BY_SLUG_FAILURE:
      return {
        ...state,
        mcpLibraryBySlug: null,
        loadingMcpLibraryBySlug: false,
        errorMcpLibraryBySlug: action.payload,
      };
    case mcpLibraryConstants.FILTER_ALL_MCP_LIBRARY:
      return {
        ...state,
        mcpLibraries: action.data,
        filters: action.newFilters,
        loadingMcpLibraries: false,
        sort: action.sort,
      };
    case mcpLibraryConstants.RESET_MCP_LIBRARY:
      return {
        ...state,
        mcpLibrary: {},
        filters: {},
        mcpLibraries: [],
      };
    case mcpLibraryConstants.SELECTED_MCPS:
      return {
        ...state,
        selectedMcps: action.payload,
      };

    default:
      return state;
  }
}
