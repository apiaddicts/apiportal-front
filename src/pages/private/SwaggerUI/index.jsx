import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

import { Container } from '@mui/material';
import Icon from '../../../components/MdIcon/Icon';
import libraryService from '../../../services/libraryService';
import classes from './swagger-ui.module.scss';

function SwaggerUI() {

  const params = useParams();

  useEffect(() => {
    libraryService.getApiOpenAPI(params.id).then((jsonOpenApi) => {
      SwaggerUi({
        dom_id: '#swaggerContainer',
        spec: jsonOpenApi,
        presets: SwaggerUi.presets.apis,
        oauth2RedirectUrl: `${window.location.protocol}//${window.location.host}/developer/apis/swagger-ui/oauth-redirect`,
        persistAuthorization: true,
      });
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
      <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
        <div id='swaggerContainer' />
      </Container>
    </>
  );
};

export default SwaggerUI;
