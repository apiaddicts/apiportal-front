/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Container } from '@mui/material';

import Title from '../../components/Title/Title';
import AccordionFilter from '../../components/Accordion/AccordionFilter';
import Accordion from '../../components/Accordion/Accordion';
import SkeletonComponent from '../../components/SkeletonComponent/SkeletonComponent';

import { getApi } from '../../redux/actions/libraryAction';

function ApiDetails(props) {
  const { api } = useSelector((state) => state.library);

  const params = useParams();
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(0);
  const [subItem, setSubItem] = useState(0);
  const [endpoint, setEndpoint] = useState({ filter: false, item: null, status: false });

  const infoApi = [{
    title: 'Información API',
    questions: ['Información', 'Descripción', 'Versiones', 'Condiciones de Uso', 'Sandbox', 'Autenticación'],
  }];

  const accData = [
    { question: 'Información API',
      data: [{ title: 'Información' }, { title: 'Descripción' }, { title: 'Versiones' }, { title: 'Condiciones de Uso' }, { title: 'Sandbox' }, { title: 'Autenticación' }],
    },
  ];

  console.log(accData);

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
    if (params.id && api && Object.keys(api).length === 0) {
      dispatch(getApi(params.id));
    }

  }, [dispatch]);

  return (
    <Container fixed className='my-10 py-10'>
      {api && Object.keys(api).length > 0 ? (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title text={api.properties.displayName ? api.properties.displayName : 'Demo API'} />
            <a href='/swagger'>Try it</a>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '3rem', alignItems: 'baseline' }}>
            <div>
              <AccordionFilter items={infoApi} clicked={clicked} setClicked={setClicked} subItem={subItem} setSubItem={setSubItem} />
              {/* <AccordionFilter items={endPoints} clicked={clicked} setClicked={setClicked} /> */}
            </div>
            <div>
              {
                !endpoint.status && (
                  infoApi.map((item, index) => (
                    <div key={index}>
                      {
                        item.questions.map((subTitle, subindex) => (
                          <Accordion key={subindex} items={accData} clicked={clicked} setClicked={setClicked} subItem={subItem} setSubItem={setSubItem} />
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
        </div>
      ) : (<SkeletonComponent />)}
    </Container>
  );
}

export default ApiDetails;

