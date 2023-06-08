import config from './config';
import handleResponse from './handleResponse';
import store from '../redux/store';

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
}

function assignGroup(userId, groupId) {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'POST',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/users/${userId}/groups/${groupId}`;

  return fetch(url, requestHeaders)
    .then((response) => response.json())
    .then((json) => json);
}

function groupsByUser(userId, top, skip, filter) {
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

function updateGroup(data) {
  const { groupId, description, displayName } = data;

  const { token } = store.getState().user;

  const params = {
    displayName,
    description,
  };

  const requestHeaders = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(params),
  };

  const url = `${config.apimUrl}/groups/${groupId}`;

  return fetch(url, requestHeaders)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return error;
    });
}

function groupDetail(groupId) {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/groups/${groupId}`;

  return fetch(url, requestHeaders)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      return error;
    });
}

function addGroup({ displayName, description }) {

  const { token } = store.getState().user;

  const params = {
    displayName,
    description,
  };

  const requestHeaders = {
    method: 'POST',
    headers: { 'Content-type': 'application/json', 'Authorization': token },
    body: JSON.stringify(params),
  };

  const url = `${config.apimUrl}/groups`;

  return fetch(url, requestHeaders)
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      return error;
    });
}

function addProduct(productName, groupId) {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/products/${productName}/groups/${groupId}`;

  return fetch(url, requestHeaders)
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      return error;
    });
}

function deleteProduct(productName, groupId) {

  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/products/${productName}/groups/${groupId}`;

  return fetch(url, requestHeaders)
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      return error;
    });
}

function listProductByGroup(groupId, top, skip, filter) {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  let url = `${config.apimUrl}/groups/${groupId}/products?$skip=${skip}`;
  url += top !== undefined && top !== null && top !== 0 ? `&$top=${top}` : '';
  url += filter !== undefined && filter !== null && filter !== '' ? `&$filter=${filter}` : '';

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => response)
    .catch((error) => error);
}

function deleteMemberGroup(groupId, userId) {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };

  const url = `${config.apimUrl}/groups/${groupId}/users/${userId}`;

  return fetch(url, requestHeaders)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => error);
}

function filterGroupsByName(search, top, skip) {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/groups?$top=${top}&$skip=${skip}&$filter=(contains(properties/displayName,'${search}'))`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });

}

function filterGroupsByDescription(search, top, skip) {
  const { token } = store.getState().user;

  const requestHeaders = {
    method: 'GET',
    headers: { 'Authorization': token },
  };

  const url = `${config.apimUrl}/groups?$top=${top}&$skip=${skip}&$filter=(contains(properties/description,'${search}'))`;

  return fetch(url, requestHeaders)
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });

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
  assignGroup,
  groupsByUser,
  groupDetail,
  updateGroup,
  addGroup,
  addProduct,
  deleteProduct,
  listProductByGroup,
  deleteMemberGroup,
  filterGroupsByName,
  filterGroupsByDescription,
  deleteGroup,
};

export default groupService;
