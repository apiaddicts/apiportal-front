import apiManagerService from '../../services/apiManagerService';
import apiManagerConstants from '../constants/apiManagerConstant';


export const getApiList = (configApim) => (dispatch) => {
 dispatch({type: apiManagerConstants.GET_ALL_API_MANAGER_REQUEST});
 apiManagerService.integrationListApis(configApim)
  .then(response => {
    if(response.data && Object.keys(response.data).length > 0){
      dispatch({
        type: apiManagerConstants.GET_ALL_API_MANAGER_SUCCESS,
        payload: response.data.instances
      })
    }else{
      dispatch({
        type: apiManagerConstants.GET_ALL_API_MANAGER_FAILURE,
        payload: response
      })
    }
    // return response
  })
  .catch(error => {
    console.error(error);
  })
}

export const getApiDetail = (configApim,id) => (dispatch) => {
  dispatch({type: apiManagerConstants.GET_API_DETAIL_REQUEST});
  apiManagerService.integrationApiDetail(configApim,id)
    .then(response => {
      if(response.data && Object.keys(response.data).length > 0){
        dispatch({
          type: apiManagerConstants.GET_API_DETAIL_SUCCESS,
          payload: response.data
        })
      }else{
        dispatch({
          type: apiManagerConstants.GET_ALL_API_MANAGER_FAILURE,
          payload: response
        })
      }
    })
    .catch(error => {
      console.error(error);
    })
}
export const getApiDefinition = (configApim, id) => (dispatch) => {
  dispatch({type: apiManagerConstants.GET_DEFINITION_REQUEST});
  apiManagerService.getApiDefinition(configApim,id)
    .then(response => {
      if(response.data || response.data != null) {
        const openApiDef = JSON.parse(response.data);
        dispatch({
          type: apiManagerConstants.GET_DEFINITION_SUCCESS,
          payload: openApiDef
        })
      }else{
        dispatch({
          type: apiManagerConstants.GET_DEFINITION_FAILED,
          payload: response
        })
      }
    })
} 

export const resetApiDetailed = () => (dispatch) => {
  dispatch({
    type: apiManagerConstants.RESET_API_DETAILED,
  });
};
