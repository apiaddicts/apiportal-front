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
import {getApiList} from '../../../redux/actions/apiManagerAction';
import classes from './apis.module.scss';
import config from '../../../services/config';


function Apis(props) {

  const topApi = config.topApi;
  const { apis, loading } = useSelector((state) => state.apiManager);
  
  const [skip, setSkip] = useState(0);
  const dispatch = useDispatch();

  // const displayApis = useMemo(() => ({
  //   apis: fApis.slice(skip, skip + topApi),
  //   skip: skip,
  //   count: fApis.length,
  // }), [fApis, skip]);

  const handleChangeSearchFilter = (text) => {
    const filterText = text.replace(/[/[`&\/\\#,@|!+()$~%.'":*?<>\]{}]/g, '');
    if (filterText.trim().length >= 3) {
      dispatch(searchApis(filterText));
    }

    if (text.trim().length === 0) {
      dispatch(listApis());
    }
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
    if(apis && apis.length === 0){
      dispatch(getApiList('Mulesoft'))
      console.log(loading);
    }


  }, []);

  const handleNext = () => {
    if (skip < displayApis.count) return setSkip(skip + topApi);
  };
  const handlePrevious = () => {
    if (skip >= topApi) return setSkip(skip - topApi);
  };

  return (
    <Container fixed sx={{ paddingLeft: {xs: '0px', md: '59px !important'}, paddingRight: {xs:' 0px', md: '97px !important'} }}>
      <Title stylesTitle={{ fontSize: '48px' }} text='APIs' />
      <div>
        {
          apis && apis.length > 0 ? (
            apis.map((api,index) => (
              <CardInformationLibrary 
                key={index}
                apiName={api.name}
                title={api.name}
                status={api.status}
                version={api.version}
                description={api.description}
                theme='dark'
                info='ver Documentacion'
                redirectTo={`/developer/apis/${api.assetId}`}
              />
            ))
          ) :
          ( <h1>Cargando...</h1> )
        }
      </div>
    </Container>
  );
}

Apis.propTypes = {};

export default Apis;
