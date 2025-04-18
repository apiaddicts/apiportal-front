import apiManagerService from '../../services/apiManagerService';
import apiManagerConstants from '../constants/apiManagerConstant';


export const getApiList = (configApim) => (dispatch) => {
 dispatch({type: apiManagerConstants.GET_ALL_API_MANAGER_REQUEST});
 apiManagerService.integrationListApis(configApim)
  .then(response => {
    if(response.data.length > 0){
      dispatch({
        type: apiManagerConstants.GET_ALL_API_MANAGER_SUCCESS,
        payload: response.data
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
          apis: response.data
        })
      }else{
        dispatch({
          type: apiManagerConstants.GET_ALL_API_MANAGER_FAILURE,
          apis: response
        })
      }
    })
    .catch(error => {
      console.error(error);
    })
}