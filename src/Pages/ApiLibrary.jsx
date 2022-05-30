import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import Title from '../components/Title/Title';
import SearchInput from '../components/Input/SearchInput';
import InputSelect from '../components/Input/InputSelect';
import CardInformation from '../components/Card/CardInformation';
import { sortApiCollection, listApis } from '../redux/actions/libraryAction';

function AppLibrary(props) {

  const { libraries, loadingLibraries, apis } = useSelector((state) => state.library);

  const dispatch = useDispatch();

  const handleChangeSearchFilter = (text) => {
    console.log(text);
  };

  const handleSort = (sort) => {
    dispatch(sortApiCollection(sort));
  };

  useEffect(() => {
    if (apis && Object.keys(apis).length === 0) {
      dispatch(listApis());
    }
  }, [dispatch, apis]);

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

  return (
    <Container fixed className='py-10 table-left'>
      <Title className='mb-18' text='Biblioteca de Apis' />
      <Grid style={{ marginTop: '20px' }} container spacing={10}>
        <Grid item xs={8}>
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
        <Grid item xs={4}>
          <InputSelect handleSelect={(e) => {
            handleSort(e);
          }}
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
                      <CardInformation
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
    </Container>
  );
}

AppLibrary.propTypes = {};

export default AppLibrary;
