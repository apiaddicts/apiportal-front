import libraryConstants from '../constants/libraryConstants';
import libraryService from '../../services/libraryService';

// eslint-disable-next-line import/prefer-default-export
export const getLibraries = () => (dispatch) => {
  libraryService.getApiBookStores().then(
    (response) => {
      dispatch({
        type: libraryConstants.GET_ALL_LIBRARY_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: libraryConstants.GET_ALL_LIBRARY_FAILURE,
        payload: error,
      });
    },
  );
};

export const getLibrary = (id) => (dispatch) => {
  libraryService.getApiBookStore(id).then(
    (response) => {
      dispatch({
        type: libraryConstants.GET_LIBRARY_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: libraryConstants.GET_LIBRARY_FAILURE,
        payload: error,
      });
    },
  );
};

export const resetGetLibrary = () => (dispatch) => {
  dispatch({
    type: libraryConstants.RESET_LIBRARY,
  });
};
