import catalogConstants from '../constants/catalogConstant';

const initialState = {
  catalogPage: {},
// catalogs constants
  backUpCatalogs: [],
  catalogs: [],
  errorCatalogs: {},
  loadingCatalogs: false,
  filtersCatalogs: {},
  // catalog constants
  catalog: {},
  errorCatalog: {},
  loadingCatalog: false,
  sortCatalog: 'asc',
  apisCatalog: {},
  errorApisCatalog: {},
  apiCatalog: {},
  errorApiCatalog: {},
  jsonOpenApiCatalog: {},
  openApiFormatCatalog: '',
  errorJsonOpenApiCatalog: {},

}

// eslint-disable-next-line default-param-last
export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case catalogConstants.GET_ALL_CATALOG_REQUEST:
      return {
        ...state,
        loadingCatalogs: true,
      };
    case catalogConstants.GET_ALL_CATALOG_SUCCESS:
      return {
        ...state,
        loadingCatalogs: false,
        catalogs: action.payload,
        backUpCatalogs: action.payload,
        errorCatalogs: {},
      };
    case catalogConstants.GET_ALL_CATALOG_FAILURE:
      return {
        ...state,
        loadingCatalogs: false,
        catalogs: [],
        backUpCatalogs: [],
        errorCatalogs: action.payload,
      };

    case catalogConstants.GET_CATALOG_SUCCESS:
      return {
        ...state,
        loadingCatalog: false,
        catalog: action.payload,
        errorCatalog: {},
      };
    case catalogConstants.GET_CATALOG_FAILURE:
      return {
        ...state,
        loadingCatalog: false,
        catalog: {},
        errorCatalog: action.payload,
      };
    case catalogConstants.GET_ALL_CATALOG_PAGE_SUCCESS:
      return {
        ...state,
        catalogPage: action.payload,
        errorCatalog: {},
      };
    case catalogConstants.GET_ALL_CATALOG_PAGE_FAILURE:
      return {
        ...state,
        catalogPage: {},
        errorCatalog: action.payload,
      };

    default:
      return state;
  }
}