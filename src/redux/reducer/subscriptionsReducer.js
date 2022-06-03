import subscriptionsConstants from '../constants/subscriptionsConstants';

const initialState = {
  // list subscriptions
  suscripcionsUser: {},
  errorSubscriptionsUser: {},
  loadingSubscriptionsUser: false,
  // create subscription to product
  loadingCreateSubscription: false,
  // renameSubscription
  renameSubscriptionResponse: {},
  // cancelSubscription
  cancelSubscriptionResponse: {},
};

// eslint-disable-next-line default-param-last
export default function subscriptionsReducer(state = initialState, action) {
  switch (action.type) {
    // Case to bring the suscripcions user
    case subscriptionsConstants.GET_ALL_SUBSCRIPTIONS_USER_REQUEST:
      return {
        ...state,
        loadingSubscriptionsUser: true,
      };
    case subscriptionsConstants.GET_ALL_SUBSCRIPTIONS_USER_SUCCESS:
      return {
        ...state,
        loadingSubscriptionsUser: false,
        suscripcionsUser: action.response,
        errorSubscriptionsUser: {},
      };
    case subscriptionsConstants.GET_ALL_SUBSCRIPTIONS_USER_FAILURE:
      return {
        ...state,
        loadingSubscriptionsUser: false,
        suscripcionsUser: {},
        errorSubscriptionsUser: action.error,
      };
    // Case to bring the create suscripcions to product
    case subscriptionsConstants.CREATE_SUBSCRIPTIONS_USER_REQUEST:
      return {
        ...state,
        loadingCreateSubscription: true,
      };
    case subscriptionsConstants.CREATE_SUBSCRIPTIONS_USER_SUCCESS:
      return {
        ...state,
        loadingCreateSubscription: false,
      };
    case subscriptionsConstants.CREATE_SUBSCRIPTIONS_USER_FAILURE:
      return {
        ...state,
        loadingCreateSubscription: false,
      };
    case subscriptionsConstants.RENAME_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        renameSubscriptionResponse: action.response,
      };
    case subscriptionsConstants.RENAME_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        renameSubscriptionResponse: action.error,
      };
    case subscriptionsConstants.CANCEL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        cancelSubscriptionResponse: action.response,
      };
    case subscriptionsConstants.CANCEL_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        cancelSubscriptionResponse: action.error,
      };
    // Case to bring reset values subscriptions
    case subscriptionsConstants.RESET_SUBSCRIPTIONS_USER:
      return {
        ...state,
        suscripcionsUser: {},
        errorSubscriptionsUser: {},
        loadingSubscriptionsUser: false,
        renameSubscriptionResponse: {},
        cancelSubscriptionResponse: {},
      };
    default:
      return state;
  }
}
