/* eslint-disable no-prototype-builtins */
import catalogConstants from '../constants/catalogConstant';
import catalogService from '../../services/catalogService';


// eslint-disable-next-line import/prefer-default-export
export const getcatalogs = () => (dispatch) => {
  dispatch({
    type: catalogConstants.GET_ALL_CATALOG_REQUEST,
  });
  catalogService.getCatalogsStores().then(
    (response) => {
      dispatch({
        type: catalogConstants.GET_ALL_CATALOG_SUCCESS,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: catalogConstants.GET_ALL_CATALOG_FAILURE,
        payload: error,
      });
    },
  );
};

export const getcatalog = (id) => (dispatch) => {
  catalogService.getCatalogStore(id).then(
    (response) => {
      dispatch({
        type: catalogConstants.GET_CATALOG_SUCCESS,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: catalogConstants.GET_CATALOG_FAILURE,
        payload: error,
      });
    },
  );
};

// eslint-disable-next-line import/prefer-default-export
export const getCatalogContent = () => (dispatch) => {
  catalogService.getCatalogContent().then(
    (response) => {
      dispatch({
        type: catalogConstants.GET_ALL_CATALOG_PAGE_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: catalogConstants.GET_ALL_CATALOG_PAGE_FAILURE,
        payload: error,
      });
    },
  );
};