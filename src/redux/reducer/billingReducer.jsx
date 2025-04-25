import BillingConstant from '../constants/BillingConstant';

const initialState = {
  billings: [],
  billing: {},
  definition: {},
  loading: false,
  error: {}
}

export default function BillingReducer(state = initialState, action) {
  switch (action.type) {
    case BillingConstant.GET_ALL_BILLING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case BillingConstant.GET_ALL_BILLING_SUCCESS:
      return {
        ...state,
        billings: action.payload,
        loading: false,
        error: {}
      }
    case BillingConstant.GET_ALL_BILLING_FAILURE:
      return {
        ...state,
        loading: false,
        billings: [],
        error: action.payload
      }
    case BillingConstant.GET_BILLING_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case BillingConstant.GET_BILLING_SUCCESS:
      return {
        ...state,
        billing: action.payload,
        loading: false
      }
    case BillingConstant.GET_BILLING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        billing: {}
      }
    case BillingConstant.RESET_BILLING:
      return {
        ...state,
        billing: {},
        error: {},
        definition: {}
      };
    case BillingConstant.GET_DEFINITION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case BillingConstant.GET_DEFINITION_SUCCESS:
      return {
        ...state,
        loading: false,
        definition: action.payload
      };
    case BillingConstant.GET_DEFINITION_FAILED:
      return {
        ...state,
        loading: false,
        definition: {},
        error: action.payload
      };
    default:
      return state;
  }
}