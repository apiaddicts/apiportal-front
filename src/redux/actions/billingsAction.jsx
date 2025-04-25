import BillingConstant from '../constants/BillingConstant';
import billingService from '../../services/billingsService';



export const billingsProducts = (headerManager) => (dispatch) => {

  dispatch({ type: BillingConstant.GET_BILLING_REQUEST });
  billingService.billingsProducts(headerManager)
    .then(response => {
      if (response.data && Object.keys(response.data).length > 0) {
        dispatch({
          type: BillingConstant.GET_ALL_BILLING_SUCCESS,
          payload: response
        })
      } else {
        dispatch({
          type: BillingConstant.GET_ALL_BILLING_FAILURE,
          payload: response
        })
      }
      // return response
    })
    .catch(error => {
      console.error(error);
    })
}
export const billingsLink = (id, headerManager) => (dispatch) => {
  dispatch({ type: BillingConstant.GET_BILLING_REQUEST });
  billingService.billingsLink(id, headerManager)
    .then(response => {
      if (response.data && Object.keys(response.data).length > 0) {
        dispatch({
          type: BillingConstant.GET_ALL_BILLING_SUCCESS,
          payload: response
        })
      } else {
        dispatch({
          type: BillingConstant.GET_ALL_BILLING_FAILURE,
          payload: response
        })
      }
      // return response
    })
    .catch(error => {
      console.error(error);
    })
}