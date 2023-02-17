import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import Icon from '../../../components/MdIcon/Icon';
import libraryService from '../../../services/libraryService';
import classes from './swagger-ui.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';

function SwaggerUI() {
  const { user } = useSelector((state) => state.user);
  const [openApi, setOpenApi] = useState();
  const params = useParams();

  useEffect(() => {
    libraryService.getApiOpenAPI(params.id).then((jsonOpenApi) => {
      setOpenApi(jsonOpenApi);
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
    <div>
      {Object.keys(user).length > 0 ? (
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
            { openApi ? <div id='swaggerContainer' /> : <SkeletonComponent /> }
          </Container>
        </>
      ) : (
        <div id='apiHome' style={{ paddingTop: '114px' }}>
          <div className={classes.banner_img}>
            <div className={`${classes.banner_img__layout}`}>
              <div className='container'>
                <div className={classes.banner_img__backTo}>
                  <Link to='/apis' className={classes.banner_img__backTo__btn}>
                    <div>
                      <Icon id='MdKeyboardBackspace' />
                    </div>
                    <div className={classes.banner_img__backTo__label}>
                      <span>Volver</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          { openApi ? <div id='swaggerContainer' /> : <SkeletonComponent /> }
        </div>
      )}
    </div>
  );
};

export default SwaggerUI;
