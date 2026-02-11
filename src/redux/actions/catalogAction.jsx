/* eslint-disable no-prototype-builtins */
import catalogConstants from '../constants/catalogConstant';
import catalogService from '../../services/catalogService';

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
export const getcatalogs = () => (dispatch) => {
  dispatch({
    type: catalogConstants.GET_ALL_CATALOG_REQUEST,
  });
  catalogService.getCatalogsStores().then(
    (response) => {
      dispatch({
        type: catalogConstants.GET_ALL_CATALOG_SUCCESS,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: catalogConstants.GET_ALL_CATALOG_FAILURE,
        payload: error,
      });
    },
  );
};

export const getcatalog = (id) => (dispatch) => {
  catalogService.getCatalogStore(id).then(
    (response) => {
      dispatch({
        type: catalogConstants.GET_CATALOG_SUCCESS,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: catalogConstants.GET_CATALOG_FAILURE,
        payload: error,
      });
    },
  );
};

// eslint-disable-next-line import/prefer-default-export
export const getCatalogContent = () => (dispatch) => {
  catalogService.getCatalogContent().then(
    (response) => {
      dispatch({
        type: catalogConstants.GET_ALL_CATALOG_PAGE_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: catalogConstants.GET_ALL_CATALOG_PAGE_FAILURE,
        payload: error,
      });
    },
  );
};

export const sortApiCollection = (sort) => (dispatch) => {
  dispatch({
    type: catalogConstants.GET_ALL_CATALOG_REQUEST,
  });

  const { catalogs } = store.getState().catalogs;
  const data = catalogs.sort(sortingValues('title', sort));
  dispatch({
    type: catalogConstants.FILTER_ALL_CATALOG,
    data: [...data],
    sort,
  });
};

export const filterCheck = (label, checked, name) => (dispatch) => {
  dispatch({
    type: catalogConstants.GET_ALL_CATALOG_REQUEST,
  });

  const { filtersCatalogs, backUpCatalogs, sort } = store.getState().catalogs;
  const newFilters = { ...filtersCatalogs };

  if (checked == null) {
    newFilters[name] = label.toLowerCase().trim();
  } else if (checked) {
    newFilters[name] = (name in newFilters) ? [...newFilters[name], label.toLowerCase()] : [label.toLowerCase()];
  } else {
    if (name in newFilters) newFilters[name] = newFilters[name].filter((item) => item !== label.toLowerCase());
  }

  let data = backUpCatalogs.filter((item) => {
    const conditions = [];
    Object.keys(newFilters).forEach((key) => {
      if (key === 'publish') {
        conditions.push((newFilters['publish'].length) ? newFilters['publish'].includes(item['publish'].toLowerCase()) : true);
      }
      if (key === 'organization') {
        conditions.push((newFilters['organization'].length) ? newFilters['organization'].includes(item['organization'].toLowerCase()) : true);
      }
      if (key === 'domain') {
        conditions.push((newFilters['domain'].length) ? newFilters['domain'].includes(item['domain'].toLowerCase()) : true);
      }
      if (key === 'tag') {
        conditions.push((newFilters['tag'].length) ? newFilters['tag'].some((filteredTag) => {
          return (item['tags'].map((tag) => tag.label.toLowerCase())).includes(filteredTag);
        }) : true);
      }
      if (key === 'search') {
        conditions.push((newFilters['search'].length) ? item['title'].toLowerCase().includes(newFilters['search']) : true);
      }
    });
    return conditions.every((v) => v === true);
  });
  data = data.sort(sortingValues('title', sort));

  dispatch({
    type: catalogConstants.FILTER_ALL_CATALOG,
    data: [...data],
    newFilters,
    sort,
  });

};
