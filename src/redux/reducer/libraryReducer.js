import libraryConstants from '../constants/libraryConstants';

const initialState = {
  // libraries constants
  libraries: [],
  errorLibraries: {},
  loadingLibraries: false,
  // library constants
  library: {},
  errorLibrary: {},
  loadingLibrary: false,
};

// eslint-disable-next-line default-param-last
export default function libraryReducer(state = initialState, action) {
  switch (action.type) {
    // Assignment of the load value of all libraries
    case libraryConstants.GET_ALL_LIBRARY_SUCCESS:
      return {
        ...state,
        libraries: action.payload,
        errorLibraries: {},
      };
    case libraryConstants.GET_ALL_LIBRARY_FAILURE:
      return {
        ...state,
        libraries: [],
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
