/* eslint-disable */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import Multiselect from 'multiselect-react-dropdown';
import Title from '../../../components/Title';
import SearchInput from '../../../components/Input/SearchInput';
import Icon from '../../../components/MdIcon/Icon';
import CardInformationLibrary from '../../../components/Card/CardInformationLibrary';
import { listApis, searchApis, getListTags, filterAPIsByTags, resetLibraryApi, getLibraryApiNextSearch, getLibraryApiPreviosSearch, getLibraryApiNext, getLibraryApiPrevios, getLibraries } from '../../../redux/actions/libraryAction';
import classes from './apis.module.scss';
import config from '../../../services/config';
import CardLibrary from './card';
import { useTranslation } from 'react-i18next';

const compareArrays = (array1, array2) => {
  return array1.filter((a) => {
    return array2.some((b) => {
      return a.assetId === b.slug;
    });
  });
};
function Apis(props) {
  const { t } = useTranslation();

  const topApi = 10;
  const { libraries, loading } = useSelector((state) => state.library);
  const [skip, setSkip] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState('list');
  const dispatch = useDispatch();

  const filteredApis = useMemo(() => {
    if (!libraries) return [];

    if (searchTerm.trim().length === 0) {
      return libraries;
    }

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    return libraries.filter(api =>
      api.title?.toLowerCase().includes(normalizedSearchTerm) ||
      api.slug?.toLowerCase().includes(normalizedSearchTerm) ||
      api.description?.toLowerCase().includes(normalizedSearchTerm)
    );
  }, [searchTerm, libraries]);

  const displayApis = useMemo(() => ({
    apis: filteredApis.slice(skip, skip + topApi),
    skip: skip,
    count: filteredApis.length,
  }), [filteredApis, skip]);

  const isLoading =
    loading &&
    (!libraries || libraries.length === 0);

  useEffect(() => {
    setSkip(0);
  }, [searchTerm]);

  const handleChangeSearchFilter = (text) => {
    const filterText = text.replace(/[/[`&\/\\#,@|!+()$~%.'":*?<>\]{}]/g, '');
    setSearchTerm(filterText);
  };

  const onSelect = (selectedList) => {
    let search = 'tags[0]=published';
    selectedList.forEach((items, index) => {
      const data = `&tags[${index}]=${items.name}`;
      search = search + data;
    });
    dispatch(filterAPIsByTags(search));
  };

  const onRemove = (selectedList) => {

    if (selectedList.length > 0) {
      let search = '';
      selectedList.forEach((items, index) => {
        let data = '';
        if (search.length === 0) {
          data = `tags[${index}]=${items.name}`;
        } else {
          data = `&tags[${index}]=${items.name}`;
        }
        search = search + data;
      });
      dispatch(filterAPIsByTags(search));
    } else {
      dispatch(listApis());
    }
  };

  useEffect(() => {
    if (libraries && libraries.length === 0) {
      dispatch(getLibraries())
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetLibraryApi());
    };
  }, []);

  const handleNext = () => {
    if (skip < displayApis.count) return setSkip(skip + topApi);
  };
  const handlePrevious = () => {
    if (skip >= topApi) return setSkip(skip - topApi);
  };

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: ' 0px', md: '97px !important' } }}>
      <div className={classes.wrapper__filters}>
        <div className={classes.filters__search}>
          <label className={classes.filters__label}>{t('filterResults')}</label>
          <SearchInput
            icon
            name='search'
            type='text'
            onChange={(e) => handleChangeSearchFilter(e.target.value)}
            placeholder={t('searchPlaceholder')}
          />
        </div>

        {/* <div className={classes.filters__version}>
          <label className={classes.filters__label}>{t('filterByVersion')}</label>
          <div className={classes.version__radios}>
            {['1.0.0', '1.0.1', '1.2.0'].map((version) => (
              <label key={version} className={classes.radio__item}>
                <input
                  type='radio'
                  name='version'
                  value={version}
                  onChange={() => handleVersionChange(version)}
                />
                <span>{version}</span>
              </label>
            ))}
          </div>
        </div> */}

        <div className={classes.view__switch}>
          <button
            className={viewType === 'list' ? classes.active : ''}
            onClick={() => setViewType('list')}
          >
            📃
          </button>
          <button
            className={viewType === 'grid' ? classes.active : ''}
            onClick={() => setViewType('grid')}
          >
            🔲
          </button>
        </div>
      </div>


      {viewType === 'list' ? (
        <div className={classes.apis__table}>
          <div className={classes.table__header}>
            <div>{t('name')}</div>
            <div>{t('version')}</div>
            <div>{t('context')}</div>
            <div>{t('provider')}</div>
            <div>{t('type')}</div>
          </div>
          {
            displayApis.apis && displayApis.apis.length > 0 && !isLoading ? (
              displayApis.apis.map((api, index) => (
                <div key={index} className={classes.table__row}>
                  <div className={classes.api__name} onClick={() => window.location.href = `/developer/apis/${api.documentId}`}>
                    {api.slug}
                  </div>
                  <div>{api.version || '-'}</div>
                  <div>{api.context || '-'}</div>
                  <div>{api.provider || '-'}</div>
                  <div>{api.protocol || 'HTTP'}</div>
                </div>
              ))
            ) : isLoading ? (
              <h1>{t('loading')}</h1>
            ) : (
              <h3>{t('noResultsFound')}</h3>
            )
          }
        </div>
      ) : (
        <div className={classes.apis__cards}>
          {
            displayApis.apis && displayApis.apis.length > 0 && !isLoading ? (
              <div className={classes.card__grid}>
                {displayApis.apis.map((api, index) => (
                  <CardLibrary key={index} api={api} />
                ))}
              </div>
            ) : isLoading ? (
              <h1>{t('loading')}</h1>
            ) : (
              <h3>{t('noResultsFound')}</h3>
            )
          }
        </div>

      )}



    </Container>
  );
}

Apis.propTypes = {};

export default Apis;
