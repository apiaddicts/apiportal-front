/* eslint-disable import/prefer-default-export */
import subscriptionsConstants from '../constants/subscriptionsConstants';
import subscriptionsService from '../../services/subscriptionsService';

import store from '../store';

import { getProductDetail, getProductSuscripcion } from './productsAction';

import config from '../../services/config';

export const listUserSubscriptions = (userId, top = config.topSubscriptions, skip = 0) => (dispatch) => {
  dispatch({ type: subscriptionsConstants.GET_ALL_SUBSCRIPTIONS_USER_REQUEST });
  subscriptionsService.listUserSubscriptions(userId, top, skip)
    .then((response) => {
      dispatch({ type: subscriptionsConstants.GET_ALL_SUBSCRIPTIONS_USER_SUCCESS, response });
    }, (error) => {
      dispatch({ type: subscriptionsConstants.GET_ALL_SUBSCRIPTIONS_USER_FAILURE, error });
    });
};

export const subscribeToAProduct = (data, userId, productName = '') => (dispatch) => {
  dispatch({ type: subscriptionsConstants.CREATE_SUBSCRIPTIONS_USER_REQUEST });
  subscriptionsService.subscribeToAProduct(data, userId)
    .then((response) => {
      dispatch({ type: subscriptionsConstants.CREATE_SUBSCRIPTIONS_USER_SUCCESS, response });
      if (productName !== '') {
        dispatch(getProductDetail(productName));
      }
    }, (error) => {
      dispatch({ type: subscriptionsConstants.CREATE_SUBSCRIPTIONS_USER_FAILURE, error });
    });
};

export const resetSubscriptionsUser = () => (dispatch) => {
  dispatch({ type: subscriptionsConstants.RESET_SUBSCRIPTIONS_USER });
};

export const renameSubscription = (userId, subscriptionId, data, productName = '') => (dispatch) => {
  dispatch({ type: subscriptionsConstants.RENAME_SUBSCRIPTIONS_REQUEST });
  subscriptionsService.renameSubscription(userId, subscriptionId, data)
    .then((response) => {
      dispatch({ type: subscriptionsConstants.RENAME_SUBSCRIPTIONS_SUCCESS, response });
      if (productName !== '') {
        dispatch(getProductDetail(productName));
      } else {
        dispatch(listUserSubscriptions(userId));
      }
    }, (error) => {
      dispatch({ type: subscriptionsConstants.RENAME_SUBSCRIPTIONS_FAILURE, error });
    });
};

export const cancelSubscription = (userId, subscriptionId, data, productName = '') => (dispatch) => {
  subscriptionsService.cancelSubscription(userId, subscriptionId, data)
    .then((response) => {
      dispatch({ type: subscriptionsConstants.CANCEL_SUBSCRIPTIONS_SUCCESS, response });
      if (productName !== '') {
        dispatch(getProductDetail(productName));
      } else {
        dispatch(listUserSubscriptions(userId));
      }
    }, (error) => {
      dispatch({ type: subscriptionsConstants.CANCEL_SUBSCRIPTIONS_FAILURE, error });
    });
};

export const getlistUserSubscriptionsNext = (userId) => (dispatch) => {
  const { subscriptionsSkip } = store.getState().suscripcions;

  const skip = subscriptionsSkip + config.topSubscriptions;

  dispatch(listUserSubscriptions(userId, config.topSubscriptions, skip));
  dispatch({ type: subscriptionsConstants.GET_SUBSCRIPTIONS_SKIP, skip });
};

export const getlistUserSubscriptionsPrevious = (userId) => (dispatch) => {
  const { subscriptionsSkip } = store.getState().suscripcions;

  const skip = subscriptionsSkip - config.topSubscriptions;

  dispatch(listUserSubscriptions(userId, config.topSubscriptions, skip));
  dispatch({ type: subscriptionsConstants.GET_SUBSCRIPTIONS_SKIP, skip });
};

export const getDetailListUserSubscriptionsNext = (productName) => (dispatch) => {
  const { detailSubscriptionsSkip } = store.getState().suscripcions;

  const skip = detailSubscriptionsSkip + config.topSubscriptions;

  dispatch(getProductSuscripcion(productName, config.topSubscriptions, skip));
  dispatch({ type: subscriptionsConstants.GET_DETAIL_SUBSCRIPTIONS_SKIP, skip });
};

export const getDetailListUserSubscriptionsPrevious = (productName) => (dispatch) => {
  const { detailSubscriptionsSkip } = store.getState().suscripcions;

  const skip = detailSubscriptionsSkip - config.topSubscriptions;

  dispatch(getProductSuscripcion(productName, config.topSubscriptions, skip));
  dispatch({ type: subscriptionsConstants.GET_DETAIL_SUBSCRIPTIONS_SKIP, skip });
};
