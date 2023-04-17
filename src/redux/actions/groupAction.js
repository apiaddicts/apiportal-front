import groupConstants from '../constants/groupConstants';
import groupService from '../../services/groupService';
import store from '../store';
import config from '../../services/config';

const listGroups = (top, skip, filter) => (dispatch) => {
  dispatch({
    type: groupConstants.LIST_ALL_GROUPS_REQUEST,
  });
  groupService.listGroups(top, skip, filter)
    .then(
      (response) => {
        dispatch({
          type: groupConstants.LIST_ALL_GROUPS_SUCCESS,
          payload: response,
        });
      },
      (error) => {
        dispatch({
          type: groupConstants.LIST_ALL_GROUPS_ERROR,
          payload: error.message,
        });
      },
    );
};

const groupsByUser = (userId, top = config.topGroup, skip = 0) => (dispatch) => {
  dispatch({
    type: groupConstants.ASSIGNED_GROUP_REQUEST,
  });
  groupService.groupsByUser(userId, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
          dispatch({
            type: groupConstants.ASSIGNED_GROUP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.ASSIGNED_GROUP_SUCCESS,
            payload: response,
          });
        }
      }
    });
};

const assignGroup = (userId, groupList) => (dispatch) => {
  dispatch({
    type: groupConstants.ASSIGN_GROUP_REQUEST,
  });

  if (groupList && Object.keys(groupList).length > 0) {
    for (let i = 0; i < groupList.length; i++) {
      const { value } = groupList[i];
      groupService.assignGroup(userId, value)
        .then(
          (response) => {
            if (Object.keys(response).length > 0) {
              if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
                dispatch({
                  type: groupConstants.ASSIGN_GROUP_ERROR,
                  payload: response,
                });
              } else {
                dispatch({
                  type: groupConstants.ASSIGN_GROUP_SUCCESS,
                  payload: response.data,
                });
              }
            }

          },
        ).finally(() => {
          dispatch(groupsByUser(userId));
        });
    }
  }

};

const groupDetail = (groupId) => (dispatch) => {
  dispatch({
    type: groupConstants.DETAIL_GROUP_REQUEST,
  });
  groupService.groupDetail(groupId)
    .then((response) => {
      dispatch({
        type: groupConstants.DETAIL_GROUP_SUCCESS,
        payload: response,
      });
    }, (error) => {
      dispatch({
        type: groupConstants.DETAIL_GROUP_ERROR,
        payload: error.message,
      });
    });
};

const addGroup = (data, flag = '', userId = '') => (dispatch) => {
  dispatch({
    type: groupConstants.ADD_GROUP_REQUEST,
  });
  let createdGroup = {};
  groupService.addGroup(data)
    .then((response) => {
      createdGroup = response;
      dispatch({
        type: groupConstants.ADD_GROUP_SUCCESS,
        payload: response,
      });
    }, (error) => {
      dispatch({
        type: groupConstants.ADD_GROUP_ERROR,
        payload: error.message,
      });
    })
    .finally(() => {
      dispatch(listGroups());
      if (flag !== '' && createdGroup && userId !== '') {
        const idGroup = createdGroup.data.data.name;
        const arrGroup = [];
        arrGroup.push({ value: idGroup });
        dispatch(assignGroup(userId, arrGroup));
      }
    });
};

const productsByGroup = (groupId, top = config.topGroup, skip = 0, filter = '') => (dispatch) => {
  dispatch({
    type: groupConstants.ASSIGNED_PRODUCT_GROUP_REQUEST,
  });
  groupService.listProductByGroup(groupId, top, skip, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.ASSIGNED_PRODUCT_GROUP_ERROR,
            payload: error,
          });
        } else {
          dispatch({
            type: groupConstants.ASSIGNED_PRODUCT_GROUP_SUCCESS,
            payload: response,
          });
        }
      }
    });
};

const getProdGroupNext = (groupId, search) => (dispatch) => {
  const { groupProdSkip } = store.getState().group;
  const skip = parseInt(groupProdSkip, 10) + parseInt(config.topProduct, 10);

  dispatch(productsByGroup(groupId, config.topProduct, skip, search));
  dispatch({
    type: groupConstants.GET_PROD_GROUP_SKIP,
    payload: skip,
  });
};

const getProdGroupPrev = (groupId, search) => (dispatch) => {
  const { groupProdSkip } = store.getState().group;
  const skip = parseInt(groupProdSkip, 10) - parseInt(config.topProduct, 10);

  dispatch(productsByGroup(groupId, config.topProduct, skip, search));
  dispatch({
    type: groupConstants.GET_PROD_GROUP_SKIP,
    payload: skip,
  });
};

const filterProdGroupByName = (groupId, search) => (dispatch) => {
  const filter = `(contains(properties/displayName, '${search}'))`;

  groupService.listProductByGroup(groupId, config.topProduct, 0, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.ASSIGNED_PRODUCT_GROUP_ERROR,
            payload: error,
          });
        } else {
          dispatch({
            type: groupConstants.ASSIGNED_PRODUCT_GROUP_SUCCESS,
            payload: response,
          });
          dispatch({
            type: groupConstants.GET_PROD_GROUP_SKIP,
            payload: 0,
          });
        }
      }
    });
};

const filterProdGroupByDescription = (groupId, search) => (dispatch) => {
  const filter = `(contains(properties/description, '${search}'))`;

  groupService.listProductByGroup(groupId, config.topProduct, 0, filter)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.ASSIGNED_PRODUCT_GROUP_ERROR,
            payload: error,
          });
        } else {
          dispatch({
            type: groupConstants.ASSIGNED_PRODUCT_GROUP_SUCCESS,
            payload: response,
          });
          dispatch({
            type: groupConstants.GET_PROD_GROUP_SKIP,
            payload: 0,
          });
        }
      }
    });
};

const updateGroup = (data) => (dispatch) => {
  dispatch({
    type: groupConstants.UPDATE_GROUP_REQUEST,
  });
  groupService.updateGroup(data)
    .then((response) => {
      dispatch({
        type: groupConstants.UPDATE_GROUP_SUCCESS,
        payload: response,
      });
    }, (error) => {
      dispatch({
        type: groupConstants.UPDATE_GROUP_ERROR,
        payload: error.message,
      });
    })
    .finally(() => {
      dispatch(groupDetail(data.groupId));
      dispatch(productsByGroup(data.groupId));
    });
};

const addProductGroup = (productList, groupId) => (dispatch) => {
  dispatch({
    type: groupConstants.ASSIGNED_PRODUCT_GROUP_REQUEST,
  });

  const assignPromise = new Promise(() => {
    if (productList && Object.keys(productList).length > 0) {
      for (let i = 0; i < productList.length; i++) {
        const { value } = productList[i];
        groupService.addProduct(value, groupId)
          .then(
            (response) => {
              dispatch({
                type: groupConstants.ADD_PRODUCT_GROUP_SUCCESS,
                payload: response,
              });
            },
            (error) => {
              dispatch({
                type: groupConstants.ADD_PRODUCT_GROUP_ERROR,
                payload: error.message,
              });
            },
          )
          .finally(() => {
            dispatch(groupDetail(groupId));
            dispatch(productsByGroup(groupId));
          });
      }
    }
  });

  assignPromise.finally(() => {
    dispatch();
  });

};

const deleteProductGroup = (productName, groupId) => (dispatch) => {
  dispatch({
    type: groupConstants.DELETE_PRODUCT_GROUP_REQUEST,
  });
  groupService.deleteProduct(productName, groupId)
    .then((response) => {
      dispatch({
        type: groupConstants.DELETE_PRODUCT_GROUP_SUCCESS,
        payload: response,
      });
    }, (error) => {
      dispatch({
        type: groupConstants.DELETE_PRODUCT_GROUP_ERROR,
        payload: error.message,
      });
    }).finally(() => {
      dispatch(groupDetail(groupId));
      dispatch(productsByGroup(groupId));
    });
};

const getGroupNext = (search) => (dispatch) => {
  const { groupSkip } = store.getState().group;
  const skip = parseInt(groupSkip, 10) + parseInt(config.topGroup, 10);

  dispatch(listGroups(config.topGroup, skip, search));
  dispatch({
    type: groupConstants.GET_GROUP_SKIP,
    payload: skip,
  });
};

const getGroupPrevious = (search) => (dispatch) => {
  const { groupSkip } = store.getState().group;
  const skip = parseInt(groupSkip, 10) - parseInt(config.topGroup, 10);
  dispatch(listGroups(config.topGroup, skip, search));
  dispatch({
    type: groupConstants.GET_GROUP_SKIP,
    payload: skip,
  });
};

const getGroupAssignedNext = (userId) => (dispatch) => {
  const { groupAssignedSkip } = store.getState().group;
  const skip = parseInt(groupAssignedSkip, 10) + parseInt(config.topGroup, 10);
  dispatch(groupsByUser(userId, config.topGroup, skip));
  dispatch({
    type: groupConstants.GET_GROUP_ASSIGNED_SKIP,
    payload: skip,
  });
};

const getGroupAssignedPrevious = (userId) => (dispatch) => {
  const { groupAssignedSkip } = store.getState().group;
  const skip = parseInt(groupAssignedSkip, 10) - parseInt(config.topGroup, 10);
  dispatch(groupsByUser(userId, config.topGroup, skip));
  dispatch({
    type: groupConstants.GET_GROUP_ASSIGNED_SKIP,
    payload: skip,
  });
};

const deleteMemberGroup = (groupId, userId) => (dispatch) => {
  dispatch({
    type: groupConstants.DELETE_ASSIGNED_GROUP_REQUEST,
  });
  groupService.deleteMemberGroup(groupId, userId)
    .then(
      (response) => {
        if (Object.keys(response).length > 0) {
          if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
            dispatch({
              type: groupConstants.DELETE_ASSIGNED_GROUP_ERROR,
              payload: response,
            });
          } else {
            dispatch({
              type: groupConstants.DELETE_ASSIGNED_GROUP_SUCCESS,
              payload: response.data,
            });
          }
        }
      },
    )
    .finally(() => {
      dispatch(groupsByUser(userId));
    });
};

const filterGroupsByName = (search, top = config.topGroup, skip = 0) => (dispatch) => {
  groupService.filterGroupsByName(search, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.LIST_ALL_GROUPS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.LIST_ALL_GROUPS_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: groupConstants.GET_GROUP_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const filterGroupsByDescription = (search, top = config.topGroup, skip = 0) => (dispatch) => {
  groupService.filterGroupsByDescription(search, top, skip)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.LIST_ALL_GROUPS_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.LIST_ALL_GROUPS_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: groupConstants.GET_GROUP_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const filterGroupAssignedByName = (appObjId, search, top = config.topGroup, skip = 0) => (dispatch) => {
  const filter = `(contains(properties/displayName,'${search}'))`;
  groupService.groupsByUser(appObjId, top, skip, filter)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
          dispatch({
            type: groupConstants.ASSIGNED_GROUP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.ASSIGNED_GROUP_SUCCESS,
            payload: response,
          });
          dispatch({
            type: groupConstants.GET_GROUP_ASSIGNED_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const filterGroupAssignedByDescription = (appObjId, search, top = config.topGroup, skip = 0) => (dispatch) => {
  const filter = `(contains(properties/description,'${search}'))`;
  groupService.groupsByUser(appObjId, top, skip, filter)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
          dispatch({
            type: groupConstants.ASSIGNED_GROUP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.ASSIGNED_GROUP_SUCCESS,
            payload: response,
          });
          dispatch({
            type: groupConstants.GET_GROUP_ASSIGNED_SKIP,
            payload: skip,
          });
        }
      }
    });
};

const resetGroup = () => (dispatch) => {
  dispatch({
    type: groupConstants.RESET_GROUP,
  });
};

const deleteGroup = (id) => (dispatch) => {
  dispatch({
    type: groupConstants.DELETE_GROUP_REQUEST,
  });
  groupService.deleteGroup(id)
    .then((response) => {
      if (response && Object.keys(response).length > 0) {
        if (Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({
            type: groupConstants.DELETE_GROUP_ERROR,
            payload: response,
          });
        } else {
          dispatch({
            type: groupConstants.DELETE_GROUP_SUCCESS,
            payload: response.data,
          });
        }
      }
    }).finally(() => {
      dispatch(resetGroup());
      dispatch(listGroups());
    });
};

const groupAction = {
  listGroups,
  assignGroup,
  groupsByUser,
  groupDetail,
  updateGroup,
  addGroup,
  productsByGroup,
  addProductGroup,
  deleteProductGroup,
  getGroupNext,
  getGroupPrevious,
  deleteMemberGroup,
  filterGroupsByName,
  filterGroupsByDescription,
  deleteGroup,
  filterGroupAssignedByName,
  filterGroupAssignedByDescription,
  getGroupAssignedNext,
  getGroupAssignedPrevious,
  resetGroup,
  getProdGroupNext,
  getProdGroupPrev,
  filterProdGroupByName,
  filterProdGroupByDescription,
};

export default groupAction;
