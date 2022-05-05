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
      };
    // Reset data of the library
    case libraryConstants.RESET_LIBRARY:
      return {
        ...state,
        library: {},
        errorLibrary: {},
      };
    default:
      return state;
  }
}
