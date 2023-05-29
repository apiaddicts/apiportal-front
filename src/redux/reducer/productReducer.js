import productsConstants from '../constants/productsConstants';

const initialState = {
  // products
  products: {},
  error: {},
  spinner: false,
  productsSkip: 0,
  // product
  product: {},
  errorProduct: {},
  spinnerProduct: false,
  // product subscriptions
  productSubscriptions: {},
  errorSubscriptions: {},
  spinnerSubscriptions: false,
  // product apis
  productApis: {},
  errorApis: {},
  spinnerApis: false,
  productsApisSkip: 0,

  subscriptionReq: false,
  subscriptionRes: [],
  subscriptionFail: {},
};

// eslint-disable-next-line default-param-last
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    // Cases to bring the products
    case productsConstants.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        spinner: true,
      };
    case productsConstants.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        spinner: false,
        products: action.response,
        error: {},
      };
    case productsConstants.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        spinner: false,
        products: [],
        error: action.error,
      };
    // Case to bring the next product
    case productsConstants.GET_PRODUCTS_SKIP:
      return {
        ...state,
        productsSkip: parseInt(action.skip, 10),
      };
      // Cases to bring the product
    case productsConstants.GET_PRODUCT_REQUEST:
      return {
        ...state,
        spinnerProduct: true,
      };
    case productsConstants.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        spinnerProduct: false,
        product: action.response,
        errorProduct: {},
      };
    case productsConstants.GET_PRODUCT_FAILURE:
      return {
        ...state,
        spinnerProduct: false,
        product: {},
        errorProduct: action.error,
      };
    // Cases to bring the products suscripcion
    case productsConstants.GET_PRODUCT_SUSCRIPCION_REQUEST:
      return {
        ...state,
        spinnerSubscriptions: true,
      };
    case productsConstants.GET_PRODUCT_SUSCRIPCION_SUCCESS:
      return {
        ...state,
        spinnerSubscriptions: false,
        productSubscriptions: action.response,
        errorSubscriptions: {},
      };
    case productsConstants.GET_PRODUCT_SUSCRIPCION_FAILURE:
      return {
        ...state,
        spinnerSubscriptions: false,
        productSubscriptions: {},
        errorSubscriptions: action.error,
      };
    // Cases to bring the products apis
    case productsConstants.GET_PRODUCT_API_REQUEST:
      return {
        ...state,
        spinnerApis: true,
      };
    case productsConstants.GET_PRODUCT_API_SUCCESS:
      return {
        ...state,
        spinnerApis: false,
        productApis: action.response,
        errorApis: {},
      };
    case productsConstants.GET_PRODUCT_API_FAILURE:
      return {
        ...state,
        spinnerApis: false,
        productApis: {},
        errorApis: action.error,
      };
    // Case to bring the next product api
    case productsConstants.GET_PRODUCT_API_SKIP:
      return {
        ...state,
        productsApisSkip: parseInt(action.skip, 10),
      };
      // Reset constants product:
    case productsConstants.RESET_PRODUCT:
      return {
        ...state,
        products: {},
        error: {},
        spinner: false,
        productsSkip: 0,
        productsApisSkip: 0,
        spinnerProduct: false,
        product: {},
        errorProduct: {},
        productSubscriptions: {},
      };

    case productsConstants.GET_SUBSCRIPTIONS_REQUEST:
      return {
        ...state,
        subscriptionReq: true,
      };

    case productsConstants.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptionRes: action.response,
        subscriptionReq: false,
      };

    case productsConstants.GET_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        subscriptionFail: action.error,
        subscriptionReq: false,
      };

    default:
      return state;
  }
}
