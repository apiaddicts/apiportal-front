import handleResponse from './handleResponse';
import handleResponseToken from './handleResponseToken';
import handleResponseRestore from './handleResponseRestore';
import store from '../redux/store';

import config from './config';

function login(email, password) {

  const params = {
    username: email,
    password,
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  };

  const url = `${config.apimUrl}/login`;

  return fetch(
    url,
    requestOptions,
  ).then(handleResponseToken)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function confirmAccount({ token }) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
  };

  const url = `${config.apimUrl}/accounts/${token}`;
  return fetch(url, requestOptions)
    .then(handleResponseToken)
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });
}

function getUserDetails(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/users/${id}?api-version=${config.apiVersion}`;
  return fetch(
    url,
    requestOptions,
  ).then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function getUserEntityTag(token, id) {
  const requestOptions = {
    method: 'HEAD',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}` },
  };

  const url = `${config.url}/users/${id}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then((response) => response.text().then((text) => {
      const etag = response.headers.get('ETag');
      const data = { etag: etag.replace(/['"]+/g, '') };
      switch (response.status) {
        case 200:
          return data;
        default:
          return Promise.reject(data);
      }
    }))
    .then((result) => result).catch((error) => {
      console.error(error);
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateUser(data) {
  const { id, token, etag } = store.getState().user;
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}`, 'If-Match': `${etag}` },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/users/${id}?api-version=${config.apiVersion}`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function signUp(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/signup`;

  return fetch(
    url,
    requestOptions,
  ).then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function verifyOldPassword(data) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `Basic ${btoa(`${data.email}:${data.password}`)}` },
  };

  const url = `${config.url}/identity?api-version=${config.apiVersion}`;
  return fetch(
    url,
    requestOptions,
  ).then(handleResponseRestore)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function changePassword(newPassword) {
  const { id, token, etag } = store.getState().user;
  const data = {
    properties: {
      password: newPassword,
    },
  };
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `SharedAccessSignature ${token}`, 'If-Match': `${etag}` },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/users/${id}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function resetPassword(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/password-recovery`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function confirmPassword(confirmToken, newPassword) {

  const bodyParams = {
    password: newPassword,
  };

  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyParams),
  };

  const url = `${config.apimUrl}/accounts/${confirmToken}/password`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
}

const userService = {
  login,
  confirmAccount,
  getUserDetails,
  getUserEntityTag,
  signUp,
  updateUser,
  verifyOldPassword,
  changePassword,
  resetPassword,
  confirmPassword,
};

export default userService;

