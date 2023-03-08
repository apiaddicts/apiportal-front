import store from '../redux/store';
import config from './config';
import handleResponse from './handleResponse';

function listUsers(top = 5, skip = 0, filter = '') {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/users?$skip=${skip}`;
  url += top !== undefined && top !== null && top !== '' ? `&$top=${top}` : '';
  url += filter !== undefined && filter !== null && filter !== '' ? `&$filter=${filter}` : '';

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response);

}

function getUsersDetail(userId) {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${userId}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response);
}

function userChangeStatus(data, userId) {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'PATCH',
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  const url = `${config.apimUrl}/users/${userId}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response);
}

const usersService = {
  listUsers,
  getUsersDetail,
  userChangeStatus,
};

export default usersService;
