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

export const listApis = () => (dispatch) => {
  libraryService.getApis().then(
    (res) => {
      dispatch({
        type: libraryConstants.GET_APIS_SUCCESS,
        payload: res,
      });
    },
    (error) => {
      dispatch({
        type: libraryConstants.GET_APIS_FAILURE,
        payload: error,
      });
    },
  );
};

export const getApi = (id) => (dispatch) => {
  libraryService.getAPi(id).then(
    (res) => {
      dispatch({
        type: libraryConstants.GET_API_SUCCESS,
        payload: res,
      });
    },
    (error) => {
      dispatch({
        type: libraryConstants.GET_API_FAILURE,
        payload: error,
      });
    },
  );
};

export const getApiOpenAPI = (id) => (dispatch) => {
  libraryService.getApiOpenAPI(id).then(
    (res) => {
      dispatch({
        type: libraryConstants.GET_API_OPENAPI_SUCCESS,
        payload: res,
      });
    },
    (error) => {
      dispatch({
        type: libraryConstants.GET_API_OPENAPI_FAILURE,
        payload: error,
      });
    },
  );
};

const sortCollection = (data, sort) => {
  return (sort === 'asc') ? data.sort((a, b) => {
    const fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  }) : data.sort((a, b) => {
    const fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa > fb) {
      return -1;
    }
    if (fa < fb) {
      return 1;
    }
    return 0;
  });
};

export const sortApiCollection = (sort) => (dispatch) => {
  const { libraries } = store.getState().library;
  const data = sortCollection(libraries, sort);
  dispatch({
    type: libraryConstants.FILTER_ALL_LIBRARY,
    data,
    sort,
  });
};

export const filterCheck = (label, checked, name) => (dispatch) => {
  dispatch({
    type: libraryConstants.GET_ALL_LIBRARY_REQUEST,
  });

  const { filters, backUpLibreries, sort } = store.getState().library;
  const newFilters = { ...filters };

  if (checked == null) {
    newFilters[name] = label.toLowerCase().trim();
  } else if (checked) {
    newFilters[name] = (name in newFilters) ? [...newFilters[name], label.toLowerCase()] : [label.toLowerCase()];
  } else {
    if (name in newFilters) newFilters[name] = newFilters[name].filter((item) => item !== label.toLowerCase());
  }

  const data = backUpLibreries.filter((item) => {
    const conditions = [];
    Object.keys(newFilters).forEach((key) => {
      if (key === 'status') {
        conditions.push((newFilters['status'].length) ? newFilters['status'].includes(item['status'].toLowerCase()) : true);
      }
      if (key === 'solution') {
        conditions.push((newFilters['solution'].length) ? newFilters['solution'].includes(item['title'].toLowerCase()) : true);
      }
      if (key === 'tag') {
        conditions.push((newFilters['tag'].length) ? newFilters['tag'].some((filteredTag) => {
          return (item['tags'].map((tag) => tag.label.toLowerCase())).includes(filteredTag);
        }) : true);
      }
      if (key === 'version') {
        conditions.push((newFilters['version'].length) ? newFilters['version'].includes(item['version'].toLowerCase()) : true);
      }
      if (key === 'search') {
        conditions.push((newFilters['search'].length) ? item['title'].toLowerCase().includes(newFilters['search']) : true);
      }
    });
    return conditions.every((v) => v === true);
  });

  dispatch({
    type: libraryConstants.FILTER_ALL_LIBRARY,
    data: sortCollection(data, sort),
    newFilters,
    sort,
  });

};

export const resetGetLibrary = () => (dispatch) => {
  dispatch({
    type: libraryConstants.RESET_LIBRARY,
  });
};

