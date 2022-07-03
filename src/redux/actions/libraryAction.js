/* eslint-disable no-prototype-builtins */
import libraryConstants from '../constants/libraryConstants';
import libraryService from '../../services/libraryService';
import config from '../../services/config';

import store from '../store';

const sortingValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
};

// eslint-disable-next-line import/prefer-default-export
export const getLibraries = () => (dispatch) => {
  dispatch({
    type: libraryConstants.GET_ALL_LIBRARY_REQUEST,
  });
  const { sort } = store.getState().library;
  libraryService.getApiBookStores().then(
    (response) => {
      dispatch({
        type: libraryConstants.GET_ALL_LIBRARY_SUCCESS,
        payload: response.sort(sortingValues('title', sort)),
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

export const listApis = (top = config.topApi, skip = 0, filter = '') => (dispatch) => {
  libraryService.getApis(top, skip, filter).then(
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

export const getListTags = () => (dispatch) => {
  dispatch({ type: libraryConstants.GET_APIS_TAGS_REQUEST });
  libraryService.getListTags().then(
    (res) => {
      dispatch({
        type: libraryConstants.GET_APIS_TAGS_SUCCESS,
        payload: res,
      });
    },
    (err) => {
      dispatch({
        type: libraryConstants.GET_APIS_TAGS_FAILURE,
        payload: err,
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

export const sortApiCollection = (sort) => (dispatch) => {
  dispatch({
    type: libraryConstants.GET_ALL_LIBRARY_REQUEST,
  });

  const { libraries } = store.getState().library;
  const data = libraries.sort(sortingValues('title', sort));
  dispatch({
    type: libraryConstants.FILTER_ALL_LIBRARY,
    data: [...data],
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

  let data = backUpLibreries.filter((item) => {
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
  data = data.sort(sortingValues('title', sort));

  dispatch({
    type: libraryConstants.FILTER_ALL_LIBRARY,
    data: [...data],
    newFilters,
    sort,
  });

};

export const searchApis = (search, top = config.topApi, skip = 0) => (dispatch) => {
  libraryService.searchApis(search, top, skip).then(
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

export const filterAPIsByTags = (search) => (dispatch) => {
  libraryService.filterAPIsByTags(search).then(
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

export const getLibraryApiNextSearch = (search) => (dispatch) => {
  const { apisSkip } = store.getState().library;

  const skip = apisSkip + config.topApi;
  dispatch(searchApis(search, config.topApi, skip));
  dispatch({ type: libraryConstants.GET_LIBRARY_SKIP, skip });
};

export const getLibraryApiPreviosSearch = (search) => (dispatch) => {
  const { apisSkip } = store.getState().library;

  const skip = apisSkip - config.topApi;
  dispatch(searchApis(search, config.topApi, skip));
  dispatch({ type: libraryConstants.GET_LIBRARY_SKIP, skip });
};

export const getLibraryApiNext = () => (dispatch) => {
  const { apisSkip } = store.getState().library;
  const skip = apisSkip + config.topApi;

  dispatch(listApis(config.topApi, skip));
  dispatch({ type: libraryConstants.GET_LIBRARY_SKIP, skip });
};

export const getLibraryApiPrevios = () => (dispatch) => {
  const { apisSkip } = store.getState().library;
  const skip = apisSkip - config.topApi;

  dispatch(listApis(config.topApi, skip));
  dispatch({ type: libraryConstants.GET_LIBRARY_SKIP, skip });
};

export const resetGetLibrary = () => (dispatch) => {
  dispatch({
    type: libraryConstants.RESET_LIBRARY,
  });
};

export const resetLibraryApi = () => (dispatch) => {
  dispatch({
    type: libraryConstants.RESET_LIBRARY_API,
  });
};

export const resetApiDetailed = () => (dispatch) => {
  dispatch({
    type: libraryConstants.RESET_API_DETAILED,
  });
};

export const getApiHostnames = (apiName) => (dispatch) => {
  libraryService.getApiHostnames(apiName).then(
    (res) => {
      dispatch({
        type: libraryConstants.GET_API_HOSTNAMES_SUCCESS,
        payload: res,
      });
    },
    (error) => {
      dispatch({
        type: libraryConstants.GET_API_HOSTNAMES_FAILURE,
        payload: error,
      });
    },
  );
};

export const resetApiHostname = () => (dispatch) => {
  dispatch({
    type: libraryConstants.RESET_API_HOSTNAMES,
  });
};
