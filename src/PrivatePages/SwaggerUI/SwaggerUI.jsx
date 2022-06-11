import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { getApiOpenAPI } from '../../redux/actions/libraryAction';
import Icon from '../../components/MdIcon/Icon';
import classes from './swagger.module.scss';

function SwaggerUI() {

  const { jsonOpenApi } = useSelector((state) => state.library);

  const params = useParams();
  console.log(params.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (jsonOpenApi) {
      dispatch(getApiOpenAPI(params.id));
    }
  }, [dispatch]);

  useEffect(() => {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      spec: jsonOpenApi,
      presets: SwaggerUi.presets.apis,
      oauth2RedirectUrl: `${window.location.protocol}//${window.location.host}/dashboard/apis/swagger-ui/oauth-redirect`,
      persistAuthorization: true,
    });
  }, []);

  return (
    <>
      <div className={classes.back__btn}>
        <Link to={-1}>
          <div className={classes.return}>
            <div>
              <Icon id='MdKeyboardBackspace' />
            </div>
            <span>VOLVER</span>
          </div>
        </Link>
      </div>
      <Container fixed sx={{ paddingLeft: '59px !important', paddingRight: '97px !important', height: '100%' }}>
        <div id='swaggerContainer' />
      </Container>
    </>
  );
};

export default SwaggerUI;
