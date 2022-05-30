import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import Multiselect from 'multiselect-react-dropdown';
import Title from '../components/Title/Title';
import SearchInput from '../components/Input/SearchInput';

import CardInformationLibrary from '../components/Card/CardInformationLibrary';
import { listApis, searchApis, getListTags } from '../redux/actions/libraryAction';

function AppLibrary(props) {

  const { libraries, loadingLibraries, apis, tagsList } = useSelector((state) => state.library);

  const dispatch = useDispatch();

  const handleChangeSearchFilter = (text) => {
    if (text.trim().length >= 3) {
      dispatch(searchApis(text));
    }

    if (text.trim().length === 0) {
      dispatch(listApis());
    }
  };

  // const selectData = tagsList && Object.keys(tagsList).length > 0 ? { options: [{ name: 'Option 1️⃣', id: 1 }, { name: 'Option 2️⃣', id: 2 }] } : [];
  const selectData = [];

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList);
    console.log(selectedItem);
  };

  const onRemove = (selectedList, removedItem) => {
    console.log(selectedList);
    console.log(removedItem);
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

  console.log(tagsList);

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
          <Multiselect
            options={selectData.options} // Options to display in the dropdown
            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue='name' // Property name to display in the dropdown options
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
    </Container>
  );
}

AppLibrary.propTypes = {};

export default AppLibrary;
