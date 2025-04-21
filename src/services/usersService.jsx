import handleResponse from './handleResponse';
import config from './config';
import store from '../redux/store';

function listUsers(top = config.topUser, skip = 0, filter = '') {

  const { token } = store.getState().user;

  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/users?$skip=${skip}`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';
  url += filter !== undefined && filter !== null && filter !== '' ? `&$filter=${filter}` : '';

  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => json);
}

function getUserDetail(userId) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${userId}`;

  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
}

/*function updateUser(data, userId) {
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
}*/

function filterUsersByName(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/users?$top=${top}&$skip=${skip}&$filter=(contains(properties/firstName,'${search}') or contains(properties/lastName,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
}

function filterUsersByEmail(search, top, skip) {
  const { token } = store.getState().user;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/users?$top=${top}&$skip=${skip}&$filter=(contains(properties/email,'${search}'))`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
}

const usersService = {
  listUsers,
  getUserDetail,
  //updateUser,
  filterUsersByName,
  filterUsersByEmail,
};

export default usersService;
