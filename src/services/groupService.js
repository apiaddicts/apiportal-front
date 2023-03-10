import store from '../redux/store';
import config from './config';
import handleResponse from './handleResponse';

function listGroups(top = config.topGroup, skip = 0, filter = '') {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/groups?$skip=${skip}`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';
  url += filter !== undefined && filter !== null && filter !== '' ? `&$filter=${filter}` : '';

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

function getGroupsByUser(userId, top, skip, filter) {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/users/${userId}/groups?$skip=${skip}`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';
  url += filter !== undefined && filter !== null && filter !== '' ? `&$filter=${filter}` : '';

  return fetch(url, requestHeaders)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      return responseJson;
    });
}

function addGroupOfUser({ groupId, userId }) {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${userId}/groups/${groupId}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);

}

function deleteGroupOfUser({ groupId, userId }) {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/groups/${groupId}/users/${userId}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
}

function deleteGroup(id) {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'DELETE',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/groups/${id}`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);

}

const groupService = {
  listGroups,
  deleteGroup,
  getGroupsByUser,
  deleteGroupOfUser,
  addGroupOfUser,
};

export default groupService;
