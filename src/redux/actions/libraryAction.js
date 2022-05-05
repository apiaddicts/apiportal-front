import libraryConstants from '../constants/libraryConstants';
import libraryService from '../../services/libraryService';

import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const getLibraries = () => (dispatch) => {
  dispatch({
    type: libraryConstants.GET_ALL_LIBRARY_REQUEST,
  });
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

export const filterCheck = (label, checked, name) => (dispatch) => {
  dispatch({
    type: libraryConstants.GET_ALL_LIBRARY_REQUEST,
  });

  const { filters, backUpLibreries, libraries } = store.getState().library;

  if (filters.length === 0) {
    const newFilters = [...filters, label];
    if (name === 0 && backUpLibreries.length > 0) {
      const data = backUpLibreries.filter((item) => {
        return item.status.toLowerCase() === label.toLowerCase();
      });

      dispatch({
        type: libraryConstants.FILTER_ALL_LIBRARY,
        data,
        newFilters,
      });
    }

    if (name === 1 && backUpLibreries.length > 0) {
      const data = backUpLibreries.filter((item) => {
        return item.title.toLowerCase() === label.toLowerCase();
      });

      dispatch({
        type: libraryConstants.FILTER_ALL_LIBRARY,
        data,
        newFilters,
      });
    }

    if (name === 2 && backUpLibreries.length > 0) {
      const data = [];
      backUpLibreries.forEach((item) => {
        item.tags.forEach((tag) => {
          if (tag.label.toLowerCase() === label.toLowerCase()) {
            data.push(item);
          }
        });
      });

      dispatch({
        type: libraryConstants.FILTER_ALL_LIBRARY,
        data,
        newFilters,
      });
    }
  } else {
    if (checked) {
      const newFilters = [...filters, label];
      if (name === 0 && libraries.length > 0) {
        const data = libraries.filter((item) => {
          return item.status.toLowerCase() === label.toLowerCase();
        });
        dispatch({
          type: libraryConstants.FILTER_ALL_LIBRARY,
          data,
          newFilters,
        });
      }

      if (name === 1 && libraries.length > 0) {
        const data = libraries.filter((item) => {
          return item.title.toLowerCase() === label.toLowerCase();
        });
        dispatch({
          type: libraryConstants.FILTER_ALL_LIBRARY,
          data,
          newFilters,
        });
      }

    } else {
      const newFilters = filters.filter((item) => {
        return item.toLowerCase() !== label.toLowerCase();
      });
      if (newFilters > 0) {
        console.log('Cargas nuevas');
      } else {
        const data = [...backUpLibreries];
        dispatch({
          type: libraryConstants.FILTER_ALL_LIBRARY,
          data,
          newFilters,
        });
      }
    }
  }

};

export const resetGetLibrary = () => (dispatch) => {
  dispatch({
    type: libraryConstants.RESET_LIBRARY,
  });
};
