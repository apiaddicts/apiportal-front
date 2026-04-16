import mcpConstants from '../constants/mcpConstants';

const initialState = {
  name: 'Headline Ad',
  mcpPage: {},
  error: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function mcpReducer(state = initialState, action) {
  switch (action.type) {
    case mcpConstants.GET_ALL_MCP_SUCCESS:
      return {
        ...state,
        mcpPage: action.payload,
      };
    case mcpConstants.GET_ALL_MCP_FAILURE:
      return {
        ...state,
        mcpPage: action.payload,
      };
    default:
      return state;
  }
};
