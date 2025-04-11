import policyConstants from '../constants/policyConstants';
import policyService from '../../services/policyService';

// eslint-disable-next-line import/prefer-default-export
export const getPrivacyPolicyContent = () => (dispatch) => {
  policyService.getPrivacyPolicyContent().then(
    (response) => {
      dispatch({
        type: policyConstants.GET_ALL_POLICY_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: policyConstants.GET_ALL_POLICY_FAILURE,
        payload: error,
      });
    },
  );
};
