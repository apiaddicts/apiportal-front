/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

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
    <Container fixed className='py-10 mt-10'>
      <Title className='mb-18' text='Biblioteca de Apis' />
      <Grid style={{ marginTop: '20px' }} container spacing={10}>
        <Grid item xs={7}>
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
        </Grid>
        <Grid item xs={5}>
          <Multiselect
            className='inputSelect'
            options={selectData} // Options to display in the dropdown
            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue='name' // Property name to display in the dropdown options
            // selectionLimit={2}
            placeholder=''
          />
        </Grid>
      </Grid>
      <Grid style={{ marginTop: '10px' }} container spacing={2}>
        <Grid item xs={12}>
          <div className='row'>
            {loadingLibraries === false && libraries ? (
              arrApis.length > 0 ? (
                arrApis.map((item, index) => (
                  <div key={index} className='flex-sm-12 flex-md-6 mt-8'>
                    <Link to={`/ApiLibrary/${item.apiName}`}>
                      <CardInformationLibrary
                        apiName={item.apiName}
                        title={item.title}
                        status={item.status}
                        version={item.version}
                        buttons={item.tags}
                        colorStatus={item.color_status}
                        info='Documentación'
                        description={item.description}
                      />
                    </Link>
                  </div>
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
                    <h1>No hay data</h1>
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
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4} direction='row' justifyContent='space-between'>
          <Grid item xs={3}>
            {apisSkip > 0 ? (
              <div onClick={() => handlePreviousLibrary()} className={classes.pagination}>
                <Icon id='MdNavigateBefore' />
                <p>Anterior</p>
              </div>

            ) : (null)}
          </Grid>
          <Grid item xs={1}>
            {apis.nextLink !== undefined ? (
              <div onClick={() => handleNextLibrary()} className={classes.pagination}>
                <p>Siguiente</p>
                <Icon id='MdNavigateNext' />
              </div>

            ) : (null)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

AppLibrary.propTypes = {};

export default AppLibrary;
