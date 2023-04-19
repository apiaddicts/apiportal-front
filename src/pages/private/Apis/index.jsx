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
import { listApis, searchApis, getListTags, filterAPIsByTags, resetLibraryApi, getLibraryApiNextSearch, getLibraryApiPreviosSearch, getLibraryApiNext, getLibraryApiPrevios } from '../../../redux/actions/libraryAction';
import classes from './apis.module.scss';
import config from '../../../services/config'

function Apis(props) {

  const topApi = parseInt(config.topApi);
  const { loadingLibraries, apis, tagsList } = useSelector((state) => state.library);
  const [skip, setSkip] = useState(0);
  const dispatch = useDispatch();
  const displayApis = useMemo(() => ({
    apis: apis && Object.keys(apis).length > 0 ? apis.value.map((api) => ({
    apiName: api.name,
    title: api.properties.displayName,
    status: 'Publicado',
    version: api.properties.apiVersion,
    tags: [{ label: 'ejemplo' }],
    color_status: 'green',
    description: api.properties.description,
  })).slice(skip, skip + topApi) : [],
    skip: skip,
    count: apis.count,
  }), [apis, skip]);
  const [search, setSearch] = useState('');

  const handleChangeSearchFilter = (text) => {
    const filterText = text.replace(/[/[`&\/\\#,@|!+()$~%.'":*?<>\]{}]/g, '');
    if (filterText.trim().length >= 3) {
      dispatch(searchApis(filterText));
      setSearch(filterText);
    }

    if (text.trim().length < 3) {
      setSearch('');
    }

    if (text.trim().length === 0) {
      dispatch(listApis());
    }
    setSkip(0);
  };

  const selectData = tagsList && Object.keys(tagsList).length > 0 && tagsList.value && tagsList.value.length > 0 ? tagsList.value.map((item, index) => {
    const options = {
      name: item.properties.displayName ? item.properties.displayName : item.name,
      id: index,
    };
    return options;
  }) : [];

  const onSelect = (selectedList, selectedItem) => {
    let tags = [];
    selectedList.forEach((item, index) => {
      tags.push(item.name);
    });
    const data = { tags };
    dispatch(filterAPIsByTags(data));
    setSkip(0);
  };

  const onRemove = (selectedList, removedItem) => {

    if (selectedList.length > 0) {
      let tags = [];
      selectedList.forEach((items, index) => {
        tags.push(items.name);
      });
      const data = { tags };
      dispatch(filterAPIsByTags(data));
    } else {
      dispatch(listApis());
    }
    setSkip(0);
  };

  useEffect(() => {
    if (apis && Object.keys(apis).length === 0) {
      dispatch(listApis());
    }

  }, []);

  useEffect(() => {
    if (tagsList && Object.keys(tagsList).length === 0) {
      dispatch(getListTags());
    };
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
    <Container fixed sx={{ paddingLeft: {xs: '0px', md: '59px !important'}, paddingRight: {xs:' 0px', md: '97px !important'} }}>
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
        {loadingLibraries === false && apis ? (
          displayApis.apis.length > 0 ? (
            displayApis.apis.map((item, index) => (
              <CardInformationLibrary
                key={index}
                apiName={item.apiName}
                title={item.title}
                status={item.status}
                version={item.version}
                buttons={item.tags}
                colorStatus={item.color_status}
                theme='dark'
                info='ver Documentación'
                description={item.description}
                redirectTo={`/developer/apis/${item.apiName}`}
              />
            ))
          ) : (null)
        ) : (null)}
      </div>

      <div className='display_flex justify_content__center mt-4'>
        {loadingLibraries === false && apis ? (
          displayApis.apis.length == 0 ? (
            <h1 className='text-center'>Información no disponible</h1>
          ) : (null)
        ) : (
          <h1>Cargando....</h1>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', marginTop: '1.875rem' }}>
        <div>
          {skip > 0 && skip - topApi >= 0 ? (
            <div onClick={() => handlePrevious()} className={classes.pagination}>
              <div className={classes.pagination__icon}>
                <Icon id='MdNavigateBefore' />
              </div>
              <p>Anterior</p>
            </div>

          ) : (null)}
        </div>
        <div>
          {displayApis.apis.length > 0 && skip + topApi < displayApis.count ? (
            <div onClick={() => handleNext()} className={classes.pagination}>
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

Apis.propTypes = {};

export default Apis;
