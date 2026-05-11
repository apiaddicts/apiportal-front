/* eslint-disable */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import ReactPaginate from 'react-paginate';
import SearchInput from '../../../components/Input/SearchInput';
import Icon from '../../../components/MdIcon/Icon';
import { resetLibraryApi, getLibraries } from '../../../redux/actions/libraryAction';
import classes from './apis.module.scss';
import CardLibrary from './card';
import { useTranslation } from 'react-i18next';

function Apis(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { libraries, loadingLibraries: loading } = useSelector((state) => state.library);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState('list');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);
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

  const pageCount = Math.ceil(filteredApis.length / itemsPerPage);
  const currentItems = filteredApis.slice(itemOffset, itemOffset + itemsPerPage);

  const isLoading =
    loading &&
    (!libraries || libraries.length === 0);

  useEffect(() => {
    setItemOffset(0);
  }, [searchTerm, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredApis.length;
    setItemOffset(newOffset);
  };

  const handleChangeSearchFilter = (text) => {
    const filterText = text.replace(/[/[`&\/\\#,@|!+()$~%.'":*?<>\]{}]/g, '');
    setSearchTerm(filterText);
  };

  useEffect(() => {
    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetLibraryApi());
    };
  }, []);

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

        <div className={classes.controls__right}>
          <div className={classes.page_size}>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className={classes.page_size__select}
            >
              {[10, 30, 60, 90].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className={classes.view__switch}>
            <button
              className={viewType === 'list' ? classes.active : ''}
              onClick={() => setViewType('list')}
            >
              <Icon id='MdOutlineViewAgenda' />
            </button>
            <button
              className={viewType === 'grid' ? classes.active : ''}
              onClick={() => setViewType('grid')}
            >
              <Icon id='MdGridView' />
            </button>
          </div>
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
            currentItems && currentItems.length > 0 && !isLoading ? (
              currentItems.map((api, index) => (
                <div
                  key={index}
                  className={classes.table__row}
                  onClick={() => navigate(`/developer/apis/${api.documentId}`)}
                >
                  <div className={classes.api__name}>{api.slug}</div>
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
            currentItems && currentItems.length > 0 && !isLoading ? (
              <div className={classes.card__grid}>
                {currentItems.map((api, index) => (
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

      <ReactPaginate
        breakLabel='...'
        nextLabel={t('LibraryPaginated.next')}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={t('LibraryPaginated.previous')}
        renderOnZeroPageCount={null}
        containerClassName={classes.pagination}
        previousClassName={classes.pagination__previous}
        nextClassName={classes.pagination__next}
        disabledClassName={classes.pagination__disabled}
        pageClassName={classes.pagination__page}
        activeClassName={classes.pagination__active}
        breakClassName={classes.pagination__page}
      />
    </Container>
  );
}

Apis.propTypes = {};

export default Apis;
