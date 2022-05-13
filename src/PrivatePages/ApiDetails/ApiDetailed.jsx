/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Container } from '@mui/material';

import Title from '../../components/Title/Title';
import AccordionFilter from '../../components/Accordion/AccordionFilter';
import Accordion from '../../components/Accordion/Accordion';

import { getLibrary, resetGetLibrary } from '../../redux/actions/libraryAction';

function ApiDetails(props) {
  const { library } = useSelector((state) => state.library);

  const params = useParams();
  const dispatch = useDispatch();

  const [active, setActive] = useState({ filter: false, item: null, status: false });
  const [endpoint, setEndpoint] = useState({ filter: false, item: null, status: false });
  const infoApi = [
    {
      title: 'Información API',
      questions: ['Información', 'Descripción', 'Versiones', 'Condiciones de Uso', 'Sandbox', 'Autenticación'],
    },
  ];
  const endPoints = [
    {
      title: 'Endpoints',
      questions: [
        { method: 'GET', subtitle: 'rerum laudantium rerum' },
        { method: 'POST', subtitle: 'dolorum est sequi' },
        { method: 'PUSH', subtitle: 'velit voluptatem fugit' },
        { method: 'DEL', subtitle: 'rerum nam aut' },
      ],
    },
  ];

  useEffect(() => {

    if (params.id && library && Object.keys(library).length === 0) {
      dispatch(getLibrary(params.id));
    }

    return () => {
      dispatch(resetGetLibrary());
    };
  }, []);

  return (
    <Container fixed className='my-10 py-10'>
      <Title text={library.title ? library.title : ''} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '3rem', alignItems: 'baseline' }}>
        <div>
          <AccordionFilter items={infoApi} active={active} setActive={setActive} />
          <AccordionFilter items={endPoints} active={endpoint} setActive={setEndpoint} />
        </div>
        <div>
          {
            !endpoint.status && (
              infoApi.map((item, index) => (
                <div key={index}>
                  {
                    item.questions.map((subTitle, subindex) => (
                      <Accordion key={subindex} title={subTitle} active={active} setActive={setActive} />
                    ))
                  }
                </div>
              ))
            )
          }
          {
            endpoint.status && (
              endPoints.map((item, index) => (
                <div key={index}>
                  {
                    item.questions.map((subTitle, subindex) => {
                      if (Object.hasOwn(subTitle, 'method')) {
                        return (
                          <Accordion key={subindex} title={subTitle.subtitle} active={endpoint} setActive={setEndpoint} />
                        );
                      } if (!Object.hasOwn(subTitle, 'method')) {
                        return (
                          <Accordion key={subindex} title={subTitle} active={endpoint} setActive={setEndpoint} />
                        );
                      }
                    })
                  }
                </div>
              ))
            )
          }
        </div>
      </Box>
    </Container>
  );
}

export default ApiDetails;

