import productsConstants from '../constants/productsConstants';
import productsService from '../../services/productsService';
import config from '../../services/config';

import store from '../store';

import { logout } from './userAction';

// eslint-disable-next-line import/prefer-default-export
export const listProducts = (top = config.topProduct, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCTS_REQUEST });

  productsService.listProducts(top, skip).then(
    (response) => {
      if (Object.keys(response).length > 0) {
        dispatch({ type: productsConstants.GET_PRODUCTS_SUCCESS, response });
      } else {
        dispatch(logout());
      }
    },
    (error) => {
      dispatch({ type: productsConstants.GET_PRODUCTS_FAILURE, error });
    },
  );
};

export const searchProducts = (search, top = config.topProduct, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCTS_REQUEST });

  productsService.searchProducts(search, top, skip).then(
    (response) => {
      if (Object.keys(response).length > 0) {
        dispatch({ type: productsConstants.GET_PRODUCTS_SUCCESS, response });
        dispatch({ type: productsConstants.GET_PRODUCTS_SKIP, skip });
      } else {
        dispatch(logout());
      }
    },
    (error) => {
      dispatch({ type: productsConstants.GET_PRODUCTS_FAILURE, error });
    },
  );
};

export const filterProductsByName = (search, top = config.topProduct, skip = 0) => (dispatch) => {

  productsService.filterProductsByName(search, top, skip).then(
    (response) => {
      if (Object.keys(response).length > 0) {
        dispatch({ type: productsConstants.GET_PRODUCTS_SUCCESS, response });
        dispatch({ type: productsConstants.GET_PRODUCTS_SKIP, skip });
      } else {
        dispatch(logout());
      }
    },
    (error) => {
      dispatch({ type: productsConstants.GET_PRODUCTS_FAILURE, error });
    },
  );
};

export const filterProductsByDescription = (search, top = config.topProduct, skip = 0) => (dispatch) => {

  productsService.filterProductsByDescription(search, top, skip).then(
    (response) => {
      dispatch({ type: productsConstants.GET_PRODUCTS_SUCCESS, response });
      dispatch({ type: productsConstants.GET_PRODUCTS_SKIP, skip });
    },
    (error) => {
      dispatch({ type: productsConstants.GET_PRODUCTS_FAILURE, error });
    },
  );
};

export const filterProductAPIsByName = (productName, search, top = config.topApi, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCT_API_REQUEST });
  productsService.filterProductAPIsByName(productName, search, top, skip).then((response) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_SUCCESS, response });
    dispatch({ type: productsConstants.GET_PRODUCT_API_SKIP, skip });
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_FAILURE, error });
  });
};

export const filterProductAPIsByDescription = (productName, search, top = config.topApi, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCT_API_REQUEST });
  productsService.filterProductAPIsByDescription(productName, search, top, skip).then((response) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_SUCCESS, response });
    dispatch({ type: productsConstants.GET_PRODUCT_API_SKIP, skip });
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_FAILURE, error });
  });
};

export const getProductSuscripcion = (productName, top = config.topSubscriptions, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCT_SUSCRIPCION_REQUEST });
  productsService.getProductSuscripcion(productName, top, skip).then((response) => {
    if (Object.keys(response).length > 0) {
      dispatch({ type: productsConstants.GET_PRODUCT_SUSCRIPCION_SUCCESS, response });
    }
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_SUSCRIPCION_FAILURE, error });
  });
};

export const getProductApis = (productName, top = config.topApi, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCT_API_REQUEST });
  productsService.getProductApis(productName, top, skip).then((response) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_SUCCESS, response });
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_FAILURE, error });
  });
};

export const getProductDetail = (productName) => (dispatch) => {

  dispatch({ type: productsConstants.GET_PRODUCT_REQUEST });
  productsService.getProductDetail(productName).then((response) => {
    if (Object.keys(response).length > 0) {
      dispatch(getProductSuscripcion(response.name));
      dispatch(getProductApis(response.name));
      dispatch({ type: productsConstants.GET_PRODUCT_SUCCESS, response });
    } else {
      dispatch(logout());
    }
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_FAILURE, error });
  });
};

export const getProductosNext = (url) => (dispatch) => {
  const { productsSkip } = store.getState().products;
  const skip = parseInt(productsSkip, 10) + parseInt(config.topProduct, 10);

  dispatch(listProducts(config.topProduct, skip));
  dispatch({ type: productsConstants.GET_PRODUCTS_SKIP, skip });
};

export const getProductPrevious = () => (dispatch) => {
  const { productsSkip } = store.getState().products;
  const skip = parseInt(productsSkip, 10) - parseInt(config.topProduct, 10);

  dispatch(listProducts(config.topProduct, skip));
  dispatch({ type: productsConstants.GET_PRODUCTS_SKIP, skip });
};

export const getProductApiNext = (url, productName) => (dispatch) => {
  const { productsApisSkip } = store.getState().products;
  const skip = parseInt(productsApisSkip, 10) + parseInt(config.topApi, 10);

  dispatch(getProductApis(productName, config.topApi, skip));
  dispatch({ type: productsConstants.GET_PRODUCT_API_SKIP, skip });
};

export const getProductApiPrevious = (productName) => (dispatch) => {
  const { productsApisSkip } = store.getState().products;
  const skip = parseInt(productsApisSkip, 10) - parseInt(config.topApi, 10);

  dispatch(getProductApis(productName, config.topApi, skip));
  dispatch({ type: productsConstants.GET_PRODUCT_API_SKIP, skip });
};

export const resetProduct = () => (dispatch) => {
  dispatch({ type: productsConstants.RESET_PRODUCT });
};
