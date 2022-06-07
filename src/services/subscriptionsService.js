import handleResponse from './handleResponse';
import config from './config';

import store from '../redux/store';

function listUserSubscriptions(userId) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/users/${userId}/subscriptions?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function subscribeToAProduct(data, userId) {
  const { token } = store.getState().user;
  const subscriptionId = crypto.randomUUID();
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/users/${userId}/subscriptions/${subscriptionId}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getName(urlValidate) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.suraUrl}${urlValidate}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function regenerateSubscription(userId, subscriptionId, fragmentUrl) {
  const { token } = store.getState().user;

  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/users/${userId}/subscriptions/${subscriptionId}/${fragmentUrl}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function listSubscriptionSecrets(userId, subscriptionId) {
  const { token } = store.getState().user;

  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/users/${userId}/subscriptions/${subscriptionId}/listSecrets?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function renameSubscription(userId, subscriptionId, data) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/users/${userId}/subscriptions/${subscriptionId}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function cancelSubscription(userId, subscriptionId, data) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/users/${userId}/subscriptions/${subscriptionId}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

const subscriptionsService = {
  listUserSubscriptions,
  listSubscriptionSecrets,
  subscribeToAProduct,
  getName,
  regenerateSubscription,
  renameSubscription,
  cancelSubscription,
};

export default subscriptionsService;
