import productsConstants from '../constants/productsConstants';
import productsService from '../../services/productsService';

import store from '../store';

import { logout } from './userAction';

// eslint-disable-next-line import/prefer-default-export
export const listProducts = (top = 2, skip = 0) => (dispatch) => {
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

export const searchProducts = (search, top = 2, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCTS_REQUEST });

  productsService.searchProducts(search, top, skip).then(
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

export const filterProductsByName = (search, top = 1, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCTS_REQUEST });

  productsService.filterProductsByName(search, top, skip).then(
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

export const filterProductsByDescription = (search, top = 1, skip = 0) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCTS_REQUEST });

  productsService.filterProductsByDescription(search, top, skip).then(
    (response) => {
      dispatch({ type: productsConstants.GET_PRODUCTS_SUCCESS, response });
    },
    (error) => {
      dispatch({ type: productsConstants.GET_PRODUCTS_FAILURE, error });
    },
  );
};

export const filterProductAPIsByName = (productName, search) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCT_API_REQUEST });
  productsService.filterProductAPIsByName(productName, search).then((response) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_SUCCESS, response });
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_FAILURE, error });
  });
};

export const filterProductAPIsByDescription = (productName, search) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCT_API_REQUEST });
  productsService.filterProductAPIsByDescription(productName, search).then((response) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_SUCCESS, response });
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_API_FAILURE, error });
  });
};

export const getProductSuscripcion = (productName) => (dispatch) => {
  dispatch({ type: productsConstants.GET_PRODUCT_SUSCRIPCION_REQUEST });
  productsService.getProductSuscripcion(productName).then((response) => {
    if (Object.keys(response).length > 0) {
      dispatch({ type: productsConstants.GET_PRODUCT_SUSCRIPCION_SUCCESS, response });
    }
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_SUSCRIPCION_FAILURE, error });
  });
};

export const getProductApis = (productName, top = 1, skip = 0) => (dispatch) => {
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
      dispatch({ type: productsConstants.GET_PRODUCT_SUCCESS, response });
      dispatch(getProductSuscripcion(response.name));
      dispatch(getProductApis(response.name));
    } else {
      dispatch(logout());
    }
  }, (error) => {
    dispatch({ type: productsConstants.GET_PRODUCT_FAILURE, error });
  });
};

export const getProductosNext = (url) => (dispatch) => {
  const { productsSkip } = store.getState().products;
  const skip = productsSkip + 1;

  dispatch(listProducts(2, 2));
  dispatch({ type: productsConstants.GET_PRODUCTS_SKIP, skip });
};

export const getProductPrevious = () => (dispatch) => {
  const { productsSkip } = store.getState().products;
  const skip = productsSkip - 1;

  dispatch(listProducts(2, 2));
  dispatch({ type: productsConstants.GET_PRODUCTS_SKIP, skip });
};

export const getProductApiNext = (url, productName) => (dispatch) => {
  const { productsApisSkip } = store.getState().products;
  const skip = productsApisSkip + 1;

  dispatch(getProductApis(productName, 1, skip));
  dispatch({ type: productsConstants.GET_PRODUCT_API_SKIP, skip });
};

export const getProductApiPrevious = (productName) => (dispatch) => {
  const { productsApisSkip } = store.getState().products;
  const skip = productsApisSkip - 1;

  dispatch(getProductApis(productName, 1, skip));
  dispatch({ type: productsConstants.GET_PRODUCT_API_SKIP, skip });
};

export const resetProduct = () => (dispatch) => {
  dispatch({ type: productsConstants.RESET_PRODUCT });
};
