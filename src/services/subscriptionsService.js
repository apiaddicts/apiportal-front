import handleResponse from './handleResponse';
import config from './config';

import store from '../redux/store';

function listUserSubscriptions(userId, top = config.topSubscriptions, skip = 0) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/users/${userId}/subscriptions?api-version=${config.apiVersion}&$top=${top}&$skip=${skip}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function subscribeToAProductWithHmac(data, userId) {
  const subscriptionId = crypto.randomUUID();
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `${config.getHmacAuthHeader()}` },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/users/${userId}/subscriptions/${subscriptionId}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.error(error);
    });
}

function getName(urlValidate) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.azureUrl}${urlValidate}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.error(error);
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
  subscribeToAProductWithHmac,
};

export default subscriptionsService;
