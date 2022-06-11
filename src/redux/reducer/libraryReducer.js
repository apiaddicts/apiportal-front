import libraryConstants from '../constants/libraryConstants';

const initialState = {
  // libraries constants
  backUpLibreries: [],
  libraries: [],
  errorLibraries: {},
  loadingLibraries: false,
  filters: {},
  // library constants
  library: {},
  errorLibrary: {},
  loadingLibrary: false,
  sort: 'asc',
  apis: {},
  errorApis: {},
  api: {},
  errorApi: {},
  jsonOpenApi: {},
  openApiFormat: '',
  errorJsonOpenApi: {},

  loadingTags: false,
  tagsList: {},
  errorTagsList: {},

  apisSkip: 0,

  hostnames: {},
  errorHostnames: {},

};

// eslint-disable-next-line default-param-last
export default function libraryReducer(state = initialState, action) {
  switch (action.type) {
    // Assignment of the load value of all libraries
    case libraryConstants.GET_ALL_LIBRARY_REQUEST:
      return {
        ...state,
        loadingLibraries: true,
      };
    case libraryConstants.GET_ALL_LIBRARY_SUCCESS:
      return {
        ...state,
        backUpLibreries: action.payload,
        libraries: action.payload,
        loadingLibraries: false,
        errorLibraries: {},
      };
    case libraryConstants.GET_ALL_LIBRARY_FAILURE:
      return {
        ...state,
        backUpLibreries: [],
        libraries: [],
        loadingLibraries: false,
        errorLibraries: action.payload,
      };
    // Assignment of the load value of library
    case libraryConstants.GET_LIBRARY_SUCCESS:
      return {
        ...state,
        library: action.payload,
        errorLibrary: {},
      };
    case libraryConstants.GET_LIBRARY_FAILURE:
      return {
        ...state,
        library: {},
        errorLibrary: action.payload,
      };
    // Assignment of the load values filters
    case libraryConstants.FILTER_ALL_LIBRARY:
      return {
        ...state,
        libraries: action.data,
        filters: action.newFilters,
        loadingLibraries: false,
        sort: action.sort,
      };
    // Assignment of the load value tags apis
    case libraryConstants.GET_APIS_TAGS_REQUEST:
      return {
        ...state,
        loadingTags: true,
      };
    case libraryConstants.GET_APIS_TAGS_SUCCESS:
      return {
        ...state,
        loadingTags: false,
        tagsList: action.payload,
        errorTagsList: {},
      };
    case libraryConstants.GET_APIS_TAGS_FAILURE:
      return {
        ...state,
        loadingTags: false,
        tagsList: {},
        errorTagsList: action.err,
      };
    // Reset data of the library
    case libraryConstants.RESET_LIBRARY:
      return {
        ...state,
        library: {},
        filters: {},
        libraries: [],
      };
    // libraries next data
    case libraryConstants.GET_LIBRARY_SKIP:
      return {
        ...state,
        apisSkip: action.skip,
      };
    // Reset data of the api librerie
    case libraryConstants.RESET_LIBRARY_API:
      return {
        ...state,
        loadingTags: false,
        tagsList: {},
        errorTagsList: {},
        apis: {},
        errorApis: {},
        apisSkip: 0,
      };
    case libraryConstants.GET_APIS_SUCCESS:
      return {
        ...state,
        apis: action.payload,
        errorApis: {},
      };
    case libraryConstants.GET_APIS_FAILURE:
      return {
        ...state,
        apis: {},
        errorApis: action.payload,
      };
    case libraryConstants.GET_API_SUCCESS:
      return {
        ...state,
        api: action.payload,
        errorApi: {},
      };
    case libraryConstants.GET_API_FAILURE:
      return {
        ...state,
        api: {},
        errorApi: action.payload,
      };
    case libraryConstants.RESET_API_DETAILED:
      return {
        ...state,
        api: {},
        errorApi: {},
      };
    case libraryConstants.GET_API_OPENAPI_SUCCESS:
      return {
        ...state,
        jsonOpenApi: action.payload,
        openApiFormat: ('swagger' in action.payload) ? 'swagger' : 'openapi',
        errorJsonOpenApi: {},
      };
    case libraryConstants.GET_API_OPENAPI_FAILURE:
      return {
        ...state,
        jsonOpenApi: {},
        errorJsonOpenApi: action.payload,
      };
    case libraryConstants.GET_API_HOSTNAMES_SUCCESS:
      return {
        ...state,
        hostnames: action.payload,
        errorHostnames: {},
      };
    case libraryConstants.GET_API_HOSTNAMES_FAILURE:
      return {
        ...state,
        hostnames: {},
        errorHostnames: action.payload,
      };
    case libraryConstants.RESET_API_HOSTNAMES:
      return {
        ...state,
        hostnames: {},
        errorHostnames: {},
      };
    default:
      return state;
  }
}
