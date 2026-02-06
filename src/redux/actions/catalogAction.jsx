/* eslint-disable no-prototype-builtins */
import catalogConstants from '../constants/catalogConstant';
import catalogService from '../../services/catalogService';
import config from '../../services/config';

import store from '../store';


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