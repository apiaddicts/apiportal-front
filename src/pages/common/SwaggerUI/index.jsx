import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

import { Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../../../components/MdIcon/Icon';
import { getApiDefinition } from '../../../redux/actions/apiManagerAction'
import classes from './swagger-ui.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';

function SwaggerUI() {
  const { user } = useSelector((state) => state.user);
  const { definition } = useSelector((state) => state.apiManager);
  const dispatch = useDispatch();
  const params = useParams();
  const swaggerRef = useRef(null);

  useEffect(() => {
    console.log('primer effect');
    console.log(definition);
    if( Object.keys(definition).length == 0){
      dispatch(getApiDefinition('Mulesoft', params.id));
    }
  }, []);

  useEffect(() => {
    if(Object.keys(definition).length > 0 && swaggerRef.current){
      SwaggerUi({
        domNode: swaggerRef.current,
        spec: definition,
        presets: [SwaggerUi.presets.apis],
        persistAuthorization: true,
      });
    }

  }, [definition]);
  

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
            { Object.keys(definition).length > 0 ? <div ref={swaggerRef} id='swaggerContainer' /> : <SkeletonComponent /> }
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
          <div className='container'>
            { Object.keys(definition).length > 0 ? <div ref={swaggerRef} id='swaggerContainer' /> : <SkeletonComponent /> }
          </div>
        </div>
      )}
    </div>
  );
};

export default SwaggerUI;
