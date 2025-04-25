import BillingConstant from '../constants/BillingConstant';

const initialState = {
  // Data pagebillings
  billingPage: {},
  error: {},
  //billings constants
  billings: [],
  filteredCodeSamples: [],
  filters: [],
  errorCodeSamples: {},
  loading: false,
  //billing constant
  billing: {},
  errorCodeSample: {},
  loadingCodeSample: false,

};

// eslint-disable-next-line default-param-last
export default function billingReducer(state = initialState, action) {
  switch (action.type) {

    case BillingConstant.GET_ALL_BILLING_SUCCESS:
      return {
        ...state,
        billings: action.payload,
        filteredCodeSamples: action.payload,
        errorCodeSamples: {},
      };
    case BillingConstant.GET_ALL_BILLING_FAILURE:
      return {
        ...state,
        billings: [],
        errorCodeSamples: action.payload,
      };
    case BillingConstant.FILTER_BILLINGS:
      return {
        ...state,
        filteredCodeSamples: action.filteredCodeSamples,
      };
    // Assignment of the load value of billing
    case BillingConstant.GET_BILLING_SUCCESS:
      return {
        ...state,
        billing: action.payload,
        errorCodeSample: {},
      };
    case BillingConstant.GET_BILLING_FAILURE:
      return {
        ...state,
        billing: {},
        errorCodeSample: action.payload,
      };
    // Assignment of the load billingPage to page billing
    case BillingConstant.GET_BILLING_DATA_ALL_SUCCESS:
      return {
        ...state,
        billingPage: action.payload,
        error: {},
      };
    case BillingConstant.GET_BILLING_DATA_ALL_FAILURE:
      return {
        ...state,
        billingPage: {},
        error: action.payload,
      };
    // Reset billingPage of the billing
    case BillingConstant.RESET_BILLING:
      return {
        ...state,
        billing: {},
        errorCodeSamples: {},
      };
    default:
      return state;
  }
}
