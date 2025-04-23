import apiManagerConstant from '../constants/apiManagerConstant';

const initialState = {
  apis: [],
  api: {},
  loading: false,
  error: {}
}

export default function apiManagerReducer (state = initialState, action) {
  switch (action.type) {
    case apiManagerConstant.GET_ALL_API_MANAGER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case apiManagerConstant.GET_ALL_API_MANAGER_SUCCESS:
      return {
        ...state,
        apis: action.payload,
        loading: false,
        error: {}
      }
    case apiManagerConstant.GET_ALL_API_MANAGER_FAILURE:
      return {
        ...state,
        loading: false,
        apis: [],
        error: action.payload
      }
    case apiManagerConstant.GET_API_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case apiManagerConstant.GET_API_DETAIL_SUCCESS:
      return {
        ...state,
        api: action.payload,
        loading: false
      }
    case apiManagerConstant.GET_API_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        api: {}
      }
    case apiManagerConstant.RESET_API_DETAILED:
      return {
        ...state,
        api: {},
        error: {},
      };
    default:
      return state;
  }
}