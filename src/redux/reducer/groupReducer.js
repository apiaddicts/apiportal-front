/* eslint-disable default-param-last */
import groupConstants from '../constants/groupConstants';

const initialState = {
  groups: {},
  assigned: {},
  assignedGroups: {},
  assignedProduct: {},
  group: {},
  errorGroupGroup: {},
  groupLoading: false,
  productGroup: {},
  groupSkip: 0,
  groupAssignedSkip: 0,
  groupProdSkip: 0,
};

export default function groupReducer(state = initialState, action) {

  switch (action.type) {
    case groupConstants.LIST_ALL_GROUPS_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.LIST_ALL_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        groupLoading: false,
      };

    case groupConstants.LIST_ALL_GROUPS_ERROR:
      return {
        ...state,
        errorGroup: action.payload,
        groupLoading: false,
      };

    case groupConstants.ASSIGN_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.ASSIGN_GROUP_SUCCESS:
      return {
        ...state,
        assigned: action.payload,
        groupLoading: false,
      };

    case groupConstants.ASSIGN_GROUP_ERROR:
      return {
        ...state,
        errorGroup: action.payload,
        groupLoading: false,
      };

    case groupConstants.ASSIGNED_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.ASSIGNED_GROUP_SUCCESS:
      return {
        ...state,
        assignedGroups: action.payload,
        groupLoading: false,
      };

    case groupConstants.ASSIGNED_GROUP_ERROR:
      return {
        ...state,
        errorGroup: action.payload,
        groupLoading: false,
      };

    case groupConstants.DETAIL_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.DETAIL_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        group: action.payload,
      };

    case groupConstants.DETAIL_GROUP_ERROR:
      return {
        ...state,
        groupLoading: false,
        errorGroup: action.payload,
      };

    case groupConstants.UPDATE_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        group: action.payload,
      };

    case groupConstants.UPDATE_GROUP_ERROR:
      return {
        ...state,
        groupLoading: false,
        errorGroup: action.payload,
      };

    case groupConstants.ADD_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.ADD_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        group: action.payload,
      };

    case groupConstants.ADD_GROUP_ERROR:
      return {
        ...state,
        groupLoading: false,
        errorGroup: action.payload,
      };

    case groupConstants.ADD_PRODUCT_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.ADD_PRODUCT_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        productGroup: action.payload,
      };

    case groupConstants.ADD_PRODUCT_GROUP_ERROR:
      return {
        ...state,
        groupLoading: false,
        errorGroup: action.payload,
      };

    case groupConstants.DELETE_PRODUCT_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.DELETE_PRODUCT_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
      };

    case groupConstants.DELETE_PRODUCT_GROUP_ERROR:
      return {
        ...state,
        groupLoading: false,
        errorGroup: action.payload,
      };

    case groupConstants.ASSIGNED_PRODUCT_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.ASSIGNED_PRODUCT_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        assignedProduct: action.payload,
      };

    case groupConstants.ASSIGNED_PRODUCT_GROUP_ERROR:
      return {
        ...state,
        groupLoading: false,
        errorGroup: action.payload,
      };

    case groupConstants.GET_GROUP_SKIP:
      return {
        ...state,
        groupSkip: action.payload,
      };

    case groupConstants.GET_GROUP_ASSIGNED_SKIP:
      return {
        ...state,
        groupAssignedSkip: action.payload,
      };

    case groupConstants.DELETE_ASSIGNED_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.DELETE_ASSIGNED_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
      };

    case groupConstants.DELETE_ASSIGNED_GROUP_ERROR:
      return {
        ...state,
        groupLoading: false,
        errorGroup: action.payload,
      };

    case groupConstants.DELETE_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
      };

    case groupConstants.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
      };

    case groupConstants.DELETE_GROUP_ERROR:
      return {
        ...state,
        groupLoading: false,
        error: action.payload,
      };

    case groupConstants.RESET_GROUP:
      return {
        ...state,
        groupSkip: 0,
        groupProdSkip: 0,
        groups: {},
      };

    case groupConstants.GET_PROD_GROUP_SKIP:
      return {
        ...state,
        groupProdSkip: action.payload,
      };

    default:
      return state;
  }

}
