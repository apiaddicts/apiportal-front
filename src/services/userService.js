import handleResponse from './handleResponse';
import handleResponseToken from './handleResponseToken';
import handleResponseRestore from './handleResponseRestore';
import handleResponseResetPwd from './handleResponseResetPwd';
import store from '../redux/store';

import config from './config';

function login(email, password) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${btoa(`${email}:${password}`)}` },
  };

  const url = `${config.url}/identity?api-version=${config.apiVersion}`;

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

function confirmAccount(queryParams) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `Ticket id="${queryParams.ticketId}",ticket="${queryParams.ticket}"` },
  };

  const url = `${config.url}/users/${queryParams.userId}/identities/Basic/${queryParams.identity}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponseToken)
    .then((response) => {
      return { ...response, id: queryParams.userId };
    }).catch((error) => {
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
    method: 'PUT',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `${config.getHmacAuthHeader()}` },
    body: JSON.stringify(data),
  };
  const uuid = crypto.randomUUID();

  const url = `${config.url}/users/${uuid}?api-version=${config.apiVersion}`;
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
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `${config.getHmacAuthHeader()}` },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/confirmations/password?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}

function resetPasswordWithTicket(queryParams, data) {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': `Ticket id="${queryParams.ticketid}",ticket="${queryParams.ticket}"` },
    body: JSON.stringify(data),
  };

  const url = `${config.url}/users/${queryParams.id}?api-version=${config.apiVersion}`;
  return fetch(url, requestOptions)
    .then(handleResponseResetPwd)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
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
  resetPasswordWithTicket,
};

export default userService;

