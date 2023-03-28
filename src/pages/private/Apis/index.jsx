/* eslint-disable */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import Multiselect from 'multiselect-react-dropdown';
import Title from '../../../components/Title';
import SearchInput from '../../../components/Input/SearchInput';
import Icon from '../../../components/MdIcon/Icon';
import CardInformationLibrary from '../../../components/Card/CardInformationLibrary';
import { listApis, searchApis, getListTags, filterAPIsByTags, resetLibraryApi, getLibraryApiNextSearch, getLibraryApiPreviosSearch, getLibraryApiNext, getLibraryApiPrevios, getLibraries } from '../../../redux/actions/libraryAction';
import classes from './apis.module.scss';

function Apis(props) {

  const { loadingLibraries, apis, tagsList, apisSkip, libraries } = useSelector((state) => state.library);

  const dispatch = useDispatch();

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
  };

  const selectData = tagsList && Object.keys(tagsList).length > 0 && tagsList.value && tagsList.value.length > 0 ? tagsList.value.map((item, index) => {
    const options = {
      name: item.properties.displayName ? item.properties.displayName : item.name,
      id: index,
    };
    return options;
  }) : [];
  console.log('d', selectData);


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
    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
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

  const compareArrays = (array1, array2) => {
    return array1.filter((a) => {
      return array2.some((b) => {
        return a.slug === b.name;
      });
    });
  };

  const fApis = libraries && libraries.length > 0 && apis && Object.keys(apis).length > 0 && apis.value.length > 0 ? compareArrays(libraries, apis.value) : [];

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
          fApis.length > 0 ? (
            fApis.map((item, index) => (
              <CardInformationLibrary
                key={index}
                apiName={item.slug}
                title={item.title}
                status={item.status}
                version={item.version}
                buttons={item.tags}
                colorStatus={item.color_status}
                theme='dark'
                info='ver Documentación'
                description={item.description}
                redirectTo={`/developer/apis/${item.slug}`}
              />
            ))
          ) : (null)
        ) : (null)}
      </div>

      <div className='display_flex justify_content__center mt-4'>
        {loadingLibraries === false && apis ? (
          fApis.length == 0 ? (
            <h1 className='text-center'>Información no disponible</h1>
          ) : (null)
        ) : (
          <h1>Cargando....</h1>
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
          {apis.nextLink !== undefined && fApis.length > 0 ? (
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

Apis.propTypes = {};

export default Apis;
