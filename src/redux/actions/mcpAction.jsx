import mcpConstants from '../constants/mcpConstants';
import mcpService from '../../services/mcpService';

// eslint-disable-next-line import/prefer-default-export
export const getMcpContent = () => (dispatch) => {
  mcpService.getMcpContent().then(
    (response) => {
      dispatch({
        type: mcpConstants.GET_ALL_MCP_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: mcpConstants.GET_ALL_MCP_FAILURE,
        payload: error,
      });
    },
  );
};
