/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Container } from '@mui/material';

import Title from '../../components/Title/Title';
import AccordionFilter from '../../components/Accordion/AccordionFilter';
import SkeletonComponent from '../../components/SkeletonComponent/SkeletonComponent';

import { getApi } from '../../redux/actions/libraryAction';
import CustomAccordion from '../../components/common/CustomAccodion/CustomAccordion';
import Icon from '../../components/MdIcon/Icon';

function ApiDetails(props) {
  const { api } = useSelector((state) => state.library);

  const params = useParams();
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(0);
  const [subItem, setSubItem] = useState(0);

  const infoApi = [{
    title: 'Información API',
    questions: ['Información', 'Descripción', 'Versiones', 'Autenticación', 'Sandbox'],
  }];

  useEffect(() => {
    if (params.id && api && Object.keys(api).length === 0) {
      dispatch(getApi(params.id));
    }

  }, [dispatch, api]);

  return (
    <Container fixed className='my-10 py-10'>
      {api && Object.keys(api).length > 0 ? (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title text={api.properties.displayName ? api.properties.displayName : 'Demo API'} />
            <Link to={`/ApiLibrary/try/${api.name}`} style={{ background: '#E3E829', borderRadius: '100px', padding: '1rem', width: '97px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontWeight: '700', fontSize: '1rem', letterSpacing: '0.8px', color: '#0033A0' }}>
              <span>Try it</span>
              <Icon id='MdChevronRight' />
            </Link>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '3rem', alignItems: 'baseline' }}>
            <div>
              <AccordionFilter items={infoApi} clicked={clicked} setClicked={setClicked} subItem={subItem} setSubItem={setSubItem} />
              {/* <AccordionFilter items={endPoints} clicked={clicked} setClicked={setClicked} /> */}
            </div>
            <div>
              <CustomAccordion items={api} subItem={subItem} setSubItem={setSubItem} />
            </div>
          </Box>
        </div>
      ) : (<SkeletonComponent />)}
    </Container>
  );
}

export default ApiDetails;

