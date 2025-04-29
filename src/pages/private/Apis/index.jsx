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
import { getApiList } from '../../../redux/actions/apiManagerAction';
import classes from './apis.module.scss';
import config from '../../../services/config';

const compareArrays = (array1, array2) => {
  return array1.filter((a) => {
    return array2.some((b) => {
      return a.assetId === b.slug;
    });
  });
};
function Apis(props) {

  const topApi = 10;
  const { apis, loading } = useSelector((state) => state.apiManager);
  const { libraries } = useSelector((state) => state.library);
  const [skip, setSkip] = useState(0);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const fApis = libraries && libraries.length > 0 && apis && apis.length > 0 ? compareArrays(apis, libraries) : [];


  const filteredApis = useMemo(() => {
    if (searchTerm.trim().length === 0) {
      return fApis;
    }
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    return fApis.filter(api => 
      api.assetId.toLowerCase().includes(normalizedSearchTerm) ||
      api.description?.toLowerCase().includes(normalizedSearchTerm)
    );
  }, [searchTerm, fApis]);

  const displayApis = useMemo(() => ({
    apis: filteredApis.slice(skip, skip + topApi),
    skip: skip,
    count: filteredApis.length,
  }), [filteredApis, skip]);
  
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
    if (apis && apis.length === 0) {
      dispatch(getApiList('Mulesoft'))
    }
    if(libraries && libraries.length === 0){
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
      <Title stylesTitle={{ fontSize: '48px' }} text='APIs' />
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
      </div>
      <div>
        {
          displayApis.apis && displayApis.apis.length > 0 && loading === false ? (
            displayApis.apis.map((api,index) => (
              <CardInformationLibrary 
                key={index}
                apiName={api.assetId}
                title={api.assetId}
                status={api.status}
                version={api.assetVersion}
                description={api.description}
                theme='dark'
                info='ver Documentacion'
                redirectTo={`/developer/apis/${api.id}`}
              />
            ))
          ) : loading === true ?
              (<h1>Cargando...</h1>)
            : (<h3>No se encontraron resultados</h3>)
        }
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.875rem' }}>
        {skip > 0 && (
          <div onClick={handlePrevious} className={classes.pagination}>
            <div className={classes.pagination__icon}>
              <Icon id='MdNavigateBefore' />
            </div>
            <p>Anterior</p>
          </div>
        )}

        {displayApis.count > 0 && skip + topApi < displayApis.count && (
          <div onClick={handleNext} className={classes.pagination}>
            <p className={classes.next}>Siguiente</p>
            <div className={classes.pagination__icon}>
              <Icon id='MdNavigateNext' />
            </div>
          </div>
        )}
      </div>

    </Container>
  );
}

Apis.propTypes = {};

export default Apis;
