import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Chip } from '@mui/material';
import moment from 'moment';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Collapse from '../Collapse';
import Spinner from '../Spinner';
import PasswordGenerate from '../common/InputMUI/passwordGenerate';
import ProductName from '../ProductName';
import classes from './SuscriptionsVertical.module.scss';

moment.locale('es');
function SuscriptionsVertical({ user, suscriptions, title, productId = '' }) {
  const { spinner } = useSelector((state) => state.suscripcions);
  return (
    <div className={classes.wrapper}>
      <Container>
        { spinner ? (
          <Spinner title='Cargando...' />
        ) : (
          <>
            <div className='font-fs-joey fs__36 font-weight-bold text__primary'>{ title }</div>
            {
              suscriptions && Object.keys(suscriptions).length > 0 && suscriptions.value.length > 0 ? (
                <>
                  {
                    suscriptions.value.map((row, i) => {
                      return (
                        <Collapse
                          row={row}
                          user={user}
                          initialState={false}
                          css_styles={{ 'custom_title': 'fs__12 text__secondary barlow' }}
                          key={i}
                        >
                          <div className='display_flex justify_content__between'>
                            <div className='text__gray__gray_darken font-weight-bold ls_02 text-uppercase'>Solicitud</div>
                            <div className='text__gray__gray_darken'>{moment(row.properties.createdDate).format('DD/MM/YYYY')}</div>
                          </div>
                          <div className='w-full mt-2'>
                            <div className='text__gray__gray_darken font-weight-bold ls_02 text-uppercase'>PRIMARY KEY</div>
                            <PasswordGenerate idSuscripcion={row.name} user={user} version={1} status={row.properties.state} />
                          </div>
                          <div className='w-full mt-2'>
                            <div className='text__gray__gray_darken font-weight-bold ls_02 text-uppercase'>SECONDARY KEY</div>
                            <PasswordGenerate idSuscripcion={row.name} user={user} version={2} status={row.properties.state} />
                          </div>
                          <div className='display_flex justify_content__between text__gray__gray_darken mt-2'>
                            <div className='text__gray__gray_darken font-weight-bold ls_02 text-uppercase'>Producto</div>
                            <ProductName scope={row.properties.scope} />
                          </div>
                          <div className='display_flex justify_content__between mt-2'>
                            <div className='text__gray__gray_darken font-weight-bold ls_02 text-uppercase'>Estado</div>
                            <Chip
                              color='secondary'
                              title={row.properties.state}
                              icon={<FiberManualRecordIcon sx={{ fontSize: '8px' }} />}
                              label={row.properties.state}
                              sx={{
                                background: 'rgba(241, 180, 52, 0.10)',
                                color: '#F1B434',
                                fontWeight: '700',
                                fontSize: '0.625rem',
                                letterSpacing: '0.8 px',
                                padding: '2px',
                                height: '20px',
                                textTransform: 'uppercase',
                              }}
                            />
                          </div>
                        </Collapse>
                      );
                    })
                  }
                </>
              ) : (
                <h3 style={{ width: '100%', textAlign: 'center', color: '#53565A', fontSize: '1rem' }}>Informacion no disponible</h3>
              )
            }
          </>
        )}
      </Container>
    </div>
  );
}

export default SuscriptionsVertical;
