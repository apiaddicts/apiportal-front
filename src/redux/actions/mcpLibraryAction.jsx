/* eslint-disable no-prototype-builtins */
import mcpLibraryConstants from '../constants/mcpLibraryConstants';
import mcpLibraryService from '../../services/mcpLibraryService';

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
export const getMcpLibraries = () => (dispatch) => {
  dispatch({
    type: mcpLibraryConstants.GET_ALL_MCP_LIBRARY_REQUEST,
  });
  mcpLibraryService.getMcpBookStores().then(
    (response) => {
      dispatch({
        type: mcpLibraryConstants.GET_ALL_MCP_LIBRARY_SUCCESS,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: mcpLibraryConstants.GET_ALL_MCP_LIBRARY_FAILURE,
        payload: error,
      });
    },
  );
};

export const getMcpLibrary = (id) => (dispatch) => {
  mcpLibraryService.getMcpBookStore(id).then(
    (response) => {
      dispatch({
        type: mcpLibraryConstants.GET_MCP_LIBRARY_SUCCESS,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: mcpLibraryConstants.GET_MCP_LIBRARY_FAILURE,
        payload: error,
      });
    },
  );
};

export const getMcpLibraryBySlug = (slug) => (dispatch) => {
  dispatch({ type: mcpLibraryConstants.GET_MCP_LIBRARY_BY_SLUG_REQUEST });
  mcpLibraryService.getMcpBookStoreData(slug).then(
    (entry) => {
      dispatch({
        type: mcpLibraryConstants.GET_MCP_LIBRARY_BY_SLUG_SUCCESS,
        payload: entry,
      });
    },
    (error) => {
      dispatch({
        type: mcpLibraryConstants.GET_MCP_LIBRARY_BY_SLUG_FAILURE,
        payload: error,
      });
    },
  );
};

export const sortMcpCollection = (sort) => (dispatch) => {
  dispatch({
    type: mcpLibraryConstants.GET_ALL_MCP_LIBRARY_REQUEST,
  });

  const { libraries } = store.getState().mcpLibrary;
  const data = libraries.sort(sortingValues('title', sort));
  dispatch({
    type: mcpLibraryConstants.FILTER_ALL_MCP_LIBRARY,
    data: [...data],
    sort,
  });
};

export const filterMcpCheck = (label, checked, name) => (dispatch) => {
  dispatch({
    type: mcpLibraryConstants.GET_ALL_MCP_LIBRARY_REQUEST,
  });

  const { filters, backUpMcpLibraries, sort } = store.getState().mcpLibrary;
  const newFilters = { ...filters };

  if (checked == null) {
    newFilters[name] = label.toLowerCase().trim();
  } else if (checked) {
    newFilters[name] = (name in newFilters) ? [...newFilters[name], label.toLowerCase()] : [label.toLowerCase()];
  } else {
    if (name in newFilters) newFilters[name] = newFilters[name].filter((item) => item !== label.toLowerCase());
  }

  let data = backUpMcpLibraries.filter((item) => {
    const conditions = [];
    Object.keys(newFilters).forEach((key) => {
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
      if (key === 'globalRating') {
        conditions.push((newFilters['globalRating']?.length) ? newFilters['globalRating'].includes((item['globalRating'] || '').toLowerCase()) : true);
      }
    });
    return conditions.every((v) => v === true);
  });
  data = data.sort(sortingValues('title', sort));

  dispatch({
    type: mcpLibraryConstants.FILTER_ALL_MCP_LIBRARY,
    data: [...data],
    newFilters,
    sort,
  });

};

export const callTool = (slug, options) => (dispatch) => {
  dispatch({
    type: mcpLibraryConstants.CALL_TOOL_REQUEST,
  });

  mcpLibraryService.callTool(slug, options).then(
    (response) => {
      dispatch({
        type: mcpLibraryConstants.CALL_TOOL_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: mcpLibraryConstants.CALL_TOOL_FAILURE,
        payload: error,
      });
    },
  );
};

export const resetMcpLibrary = () => (dispatch) => {
  dispatch({
    type: mcpLibraryConstants.RESET_MCP_LIBRARY,
  });
};

export const showSelectedMcps = (selectedMcps) => (dispatch) => {
  dispatch({
    type: mcpLibraryConstants.SELECTED_MCPS,
    payload: selectedMcps,
  });
};

export const setMcpLiveSession = (slug, resources, tools, prompts, headers) => (dispatch) => {
  dispatch({
    type: mcpLibraryConstants.SET_MCP_LIVE_SESSION,
    payload: { slug, resources, tools, prompts, headers },
  });
};

export const clearMcpLiveSession = () => (dispatch) => {
  dispatch({ type: mcpLibraryConstants.CLEAR_MCP_LIVE_SESSION });
};