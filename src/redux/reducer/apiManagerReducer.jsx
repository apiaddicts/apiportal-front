import apiManagerConstant from '../constants/apiManagerConstant';

const initialState = {
  apis: [],
  api: {},
  definition:{},
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
        definition:{}
      };
    case apiManagerConstant.GET_DEFINITION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case apiManagerConstant.GET_DEFINITION_SUCCESS:
      return {
        ...state,
        loading: false,
        definition: action.payload
      };
    case apiManagerConstant.GET_DEFINITION_FAILED:
      return {
        ...state,
        loading: false,
        definition: {},
        error: action.payload
      };
    default:
      return state;
  }
}