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

function subscribeToAProduct(data, userId, productName) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/users/${userId}/products/${productName}/subscriptions`;

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
    headers: { 'Content-Type': 'application/json', 'Authorization': `${config.hmacAuthHeader}` },
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

  const url = `${config.apimUrl}${urlValidate}?api-version=${config.apiVersion}`;

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
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${userId}/subscriptions/${subscriptionId}/${fragmentUrl}`;

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
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/users/${userId}/subscriptions/${subscriptionId}`;

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
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/users/${userId}/subscriptions/${subscriptionId}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function listSubscriptionbyId(userId, subscriptionId) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${userId}/subscriptions/${subscriptionId}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getReportsbySubscription(subscriptionId, init, limit) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  let filter = `subscriptionId eq '${subscriptionId}' and timestamp ge datetime'${init}'`;
  if (limit) filter += ` and timestamp le datetime'${limit}'`;
  const url = `${config.apimUrl}/reports/bySubscription?api-version=${config.apiVersion}&%24filter=${filter}`;

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
  listSubscriptionbyId,
  getReportsbySubscription,
  subscribeToAProductWithHmac,
};

export default subscriptionsService;
