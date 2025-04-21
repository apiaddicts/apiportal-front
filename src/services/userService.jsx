import handleResponse from './handleResponse';
import handleResponseToken from './handleResponseToken';
import handleResponseRestore from './handleResponseRestore';
import handleResponseResetPwd from './handleResponseResetPwd';
import store from '../redux/store';

import config from './config';

function login(username, password) {
  const body = {
    clientId: config.keycloakKey,
    username,
    password
  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  const url = `${config.authUrl}/token`;

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

// function getUserDetails(token) {
//   const requestOptions = {
//     method: 'GET',
//     headers: { 'Authorization': `Bearer ${token}`},
//   };

//   const url = `${config.integratorUrl}/users/me`;
//   return fetch(
//     url,
//     requestOptions,
//   ).then(handleResponse)
//     .then((response) => {
//       return response;
//     }).catch((error) => {
//       console.error(error);
//     });
// }

function getUserDetails(token) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}`, 'client_id': '0d9283d1242b48b598ff818939c96a25', 'client_secret': '018dD2A4c52944008De8ecfAAc571eFc' },
  };

  const url = `https://dev.kopernica.cloud/prc/users/v1/users/me`;
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

function getUserGroups(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${id}/groups`;
  return fetch(
    url,
    requestOptions,
  ).then(handleResponse)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      return error;
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

function changeStatus(data, userId) {
  const { token } = store.getState().user;

  const requestOptions = {
    method: 'PATCH',
    headers: { 'Authorization': token, 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/users/${userId}`;

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => error);

};

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

function confirmPassword(confirmToken, newPassword) {
  const { token } = store.getState().user;

  const bodyParams = {
    password: newPassword,
  };

  const requestOptions = {
    method: 'PATCH',
    headers: { 'Authorization': token, 'Content-type': 'application/json' },
    body: JSON.stringify(bodyParams),
  };

  const url = `${config.apimUrl}/accounts/${confirmToken}/password`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);

};

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
  getUserGroups,
  changeStatus,
  confirmPassword,
};

export default userService;

