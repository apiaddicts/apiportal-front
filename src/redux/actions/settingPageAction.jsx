import settingPageConstants from '../constants/settingPageConstants';
import settingPageService from '../../services/settingPage';

import store from '../store';



export const getSettingPage = () => (dispatch) => {
 console.log('getSettingPage action called')
  dispatch({ type: settingPageConstants.GET_SETTING_PAGE_REQUEST });
  settingPageService.getSettingPage()
    .then(response => {
      if (response.data && Object.keys(response.data).length > 0) {
        dispatch({
          type: settingPageConstants.GET_ALL_SETTING_PAGE_SUCCESS,
          payload: response
        })
      } else {
        dispatch({
          type: settingPageConstants.GET_ALL_SETTING_PAGE_FAILURE,
          payload: response
        })
      }
      // return response
    })
    .catch(error => {
      console.error(error);
    })
}