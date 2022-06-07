import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { getApiOpenAPI } from '../../redux/actions/libraryAction';

function Swagger() {

  const { jsonOpenApi } = useSelector((state) => state.library);

  const params = useParams();
  console.log(params.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (jsonOpenApi) {
      dispatch(getApiOpenAPI(params.id));
    }
  }, [dispatch]);

  return (
    <Container fixed sx={{ paddingLeft: '59px !important', paddingRight: '97px !important', height: '100%' }}>
      <SwaggerUI
        spec={jsonOpenApi}
      />
    </Container>
  );
};

export default Swagger;
