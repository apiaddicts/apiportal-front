import BillingConstant from '../constants/BillingConstant';
import billingService from '../../services/billingsService';



export const billingsProducts = () => (dispatch) => {
  billingService.billingsProducts().then(
    (response) => {
      dispatch({
        type: BillingConstant.GET_BILLING_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: BillingConstant.GET_BILLING_FAILURE,
        payload: error,
      });
    },
  );
};
export const billingsLink = (id, headerManager) => (dispatch) => {
  billingService.billingsLink(id, headerManager).then(
    (response) => {
      dispatch({
        type: BillingConstant.GET_BILLING_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: BillingConstant.GET_BILLING_FAILURE,
        payload: error,
      });
    },
  );
};
