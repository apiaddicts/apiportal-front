/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import { Link } from 'react-router-dom';

import { Container } from '@mui/material';

import Multiselect from 'multiselect-react-dropdown';
import Title from '../components/Title/Title';
import SearchInput from '../components/Input/SearchInput';
import Icon from '../components/MdIcon/Icon';

import CardInformationLibrary from '../components/Card/CardInformationLibrary';
import { listApis, searchApis, getListTags, filterAPIsByTags, resetLibraryApi, getLibraryApiNextSearch, getLibraryApiPreviosSearch, getLibraryApiNext, getLibraryApiPrevios } from '../redux/actions/libraryAction';

import classes from '../styles/pages/apiLibrary.module.scss';

function AppLibrary(props) {

  const { libraries, loadingLibraries, apis, tagsList, apisSkip } = useSelector((state) => state.library);

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const handleChangeSearchFilter = (text) => {
    if (text.trim().length >= 3) {
      dispatch(searchApis(text));
      setSearch(text);
    }

    if (text.trim().length < 3) {
      setSearch('');
    }

    if (text.trim().length === 0) {
      dispatch(listApis());
    }
  };

  const selectData = tagsList && Object.keys(tagsList).length > 0 && tagsList.value && tagsList.value.length > 0 ? tagsList.value.map((item, index) => {
    const options = {
      name: item.properties.displayName ? item.properties.displayName : item.name,
      id: index,
    };
    return options;
  }) : [];

  const onSelect = (selectedList, selectedItem) => {
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
  };

  const onRemove = (selectedList, removedItem) => {

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
    if (apis && Object.keys(apis).length === 0) {
      dispatch(listApis());
    }

  }, [dispatch, apis]);

  useEffect(() => {
    if (tagsList && Object.keys(tagsList).length === 0) {
      dispatch(getListTags());
    };
  }, [tagsList]);

  useEffect(() => {
    return () => {
      dispatch(resetLibraryApi());
    };
  }, []);

  const arrApis = apis && Object.keys(apis).length > 0 ? apis.value.map((api) => {
    return {
      apiName: api.name,
      title: api.properties.displayName,
      status: 'Publicado',
      version: api.properties.apiVersion,
      tags: [{ label: 'ejemplo' }],
      color_status: 'green',
      description: api.properties.description,
    };
  }) : [];

  const handleNextLibrary = (url) => {
    if (search.length > 0) {
      dispatch(getLibraryApiNextSearch(search));
    } else {
      dispatch(getLibraryApiNext());
    };
  };

  const handlePreviousLibrary = () => {
    if (search.length > 0) {
      dispatch(getLibraryApiPreviosSearch(search));
    } else {
      dispatch(getLibraryApiPrevios());
    }
  };

  return (
    <Container fixed sx={{ paddingLeft: '59px !important', paddingRight: '97px !important' }}>
      <Title stylesTitle={{ fontSize: '48px' }} text='Biblioteca de Apis' />
      <div className={classes.wrapper__filters}>
        <div>
          <SearchInput
            icon
            name='search'
            type='text'
            onChange={(e) => {
              handleChangeSearchFilter(e.target.value);
            }}
            placeholder='Buscar APIs...'
            borderRadius='20px'
          />
        </div>
        <div className={classes.wrapper__filters__search}>
          <span className={classes.filter}>
            Filtrar por
            {' '}
            <b>Tag</b>
            {' '}
            :
          </span>
          <Multiselect
            className={`inputSelect ${classes.selectIn}`}
            options={selectData} // Options to display in the dropdown
            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue='name' // Property name to display in the dropdown options
            // selectionLimit={2}
            placeholder=''
          />

        </div>
      </div>
      <div className={classes.grid__apis}>
        {loadingLibraries === false && libraries ? (
          arrApis.length > 0 ? (
            arrApis.map((item, index) => (
              <CardInformationLibrary
                apiName={item.apiName}
                title={item.title}
                status={item.status}
                version={item.version}
                buttons={item.tags}
                colorStatus={item.color_status}
                info='Documentación'
                description={item.description}
                redirectTo={`/apiBookstores/${item.apiName}`}
              />
            ))
          ) : (
            <section
              style={{
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '2rem',
                }}
              >
                <h1 className='align-center'>Información no disponible</h1>
              </div>
            </section>
          )
        ) : (
          <section
            style={{
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '2rem',
              }}
            >
              <h1>Cargando....</h1>
            </div>
          </section>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', marginTop: '1.875rem' }}>
        <div>
          {apisSkip > 0 ? (
            <div onClick={() => handlePreviousLibrary()} className={classes.pagination}>
              <div className={classes.pagination__icon}>
                <Icon id='MdNavigateBefore' />
              </div>
              <p>Anterior</p>
            </div>

          ) : (null)}
        </div>
        <div>
          {apis.nextLink !== undefined ? (
            <div onClick={() => handleNextLibrary()} className={classes.pagination}>
              <p className={classes.next}>Siguiente</p>
              <div className={classes.pagination__icon}>
                <Icon id='MdNavigateNext' />
              </div>
            </div>

          ) : (null)}
        </div>
      </div>
    </Container>
  );
}

AppLibrary.propTypes = {};

export default AppLibrary;
