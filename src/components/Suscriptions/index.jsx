/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableHead, TableRow, TableCell, Table, TableContainer, TableBody, Chip, Container, Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import moment from 'moment';
import PasswordGenerate from '../common/InputMUI/passwordGenerate';
import ProductName from '../../PrivatePages/ProfileAdmin/containers/Product';
import {
  resetSubscriptionsUser,
  renameSubscription,
  getlistUserSubscriptionsNext,
  getlistUserSubscriptionsPrevious,
  getDetailListUserSubscriptionsNext,
  getDetailListUserSubscriptionsPrevious,
  cancelSubscription } from '../../redux/actions/subscriptionsAction';
import 'moment/locale/es';
import MenuOptions from '../MenuOptions';
import Spinner from '../Spinner';
import classes from './Suscriptions.module.scss';

import Icon from '../MdIcon/Icon';

moment.locale('es');
function Suscriptions({ user, suscriptions, title, productId = '' }) {
  const { renameSubscriptionResponse, cancelSubscriptionResponse, spinner, subscriptionsSkip, detailSubscriptionsSkip } = useSelector((state) => state.suscripcions);
  const [edit, setEdit] = useState('');
  const dispatch = useDispatch();
  const handleRename = (rowRename) => {
    setEdit(rowRename.id);
  };

  const handleCancel = (rowCancel) => {
    const data = {
      'properties': {
        'state': 'Cancelled',
      },
    };
    if (productId !== '') {
      dispatch(cancelSubscription(user.name, rowCancel.name, data, productId));
    }
    dispatch(cancelSubscription(user.name, rowCancel.name, data));
  };

  const handleKeyDown = (row, e) => {
    if (e.key === 'Enter') {
      const data = {
        'properties': {
          'name': e.target.value,
        },
      };
      if (productId !== '') {
        dispatch(renameSubscription(user.name, row.name, data, productId));
      }
      dispatch(renameSubscription(user.name, row.name, data));
    } else if (e.key === 'Escape') {
      setEdit('');
    }
  };

  const handleBLur = (row, e) => {
    const data = {
      'properties': {
        'name': e.target.value,
      },
    };

    if (productId !== '') {
      dispatch(renameSubscription(user.name, row.name, data, productId));
    }
    dispatch(renameSubscription(user.name, row.name, data));
  };

  useEffect(() => {
    if (Object.keys(cancelSubscriptionResponse).length > 0 && Object.prototype.hasOwnProperty.call(cancelSubscriptionResponse, 'status')) {
      dispatch(resetSubscriptionsUser());
      setEdit('');
    }
  }, [cancelSubscriptionResponse]);

  useEffect(() => {
    if (Object.keys(renameSubscriptionResponse).length > 0 && Object.prototype.hasOwnProperty.call(renameSubscriptionResponse, 'status')) {
      dispatch(resetSubscriptionsUser());
      setEdit('');
    }
  }, [renameSubscriptionResponse]);

  useEffect(() => {
    return () => {
      dispatch(resetSubscriptionsUser());
    };
  }, []);

  const handleNextSubscriptions = (url) => {
    if (productId === '') {
      dispatch(getlistUserSubscriptionsNext(user.name));
    } else {
      dispatch(getDetailListUserSubscriptionsNext(productId));
    }
  };

  const handlePreviousSubscriptions = () => {
    if (productId === '') {
      dispatch(getlistUserSubscriptionsPrevious(user.name));
    } else {
      dispatch(getDetailListUserSubscriptionsPrevious(productId));
    }
  };

  return (
    <div>
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
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead className={classes.table_head}>
                          <TableRow>
                            <TableCell style={{ width: '210px' }}>
                              Nombre
                            </TableCell>
                            <TableCell style={{ width: '70px' }}>
                              Solicitud
                            </TableCell>
                            <TableCell style={{ width: '255px' }}>
                              Primary key
                            </TableCell>
                            <TableCell style={{ width: '255px' }}>
                              Secundary key
                            </TableCell>
                            <TableCell>
                              Producto
                            </TableCell>
                            <TableCell style={{ width: '90px' }}>
                              Estado
                            </TableCell>
                            <TableCell style={{ width: '50px' }}>
                            &nbsp;
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {suscriptions.value && suscriptions.value.length > 0 ? (
                            <>
                              {suscriptions.value.map((row, i) => (
                                <TableRow
                                  key={i}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                                >
                                  <TableCell>
                                    {
                                      edit.length > 0 && edit === row.id ? (
                                        <input
                                          id={row.id}
                                          type='text'
                                          placeholder='Nuevo nombre'
                                          defaultValue={row.properties.displayName}
                                          onKeyDown={(e) => handleKeyDown(row, e)}
                                          onBlur={(e) => handleBLur(row, e)}
                                          className={classes.input}
                                        />
                                      ) :
                                        <p>{row.properties.displayName}</p>
                                    }
                                  </TableCell>
                                  <TableCell>
                                    <p>
                                      {moment(row.properties.createdDate).format('DD/MM/YYYY')}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <PasswordGenerate idSuscripcion={row.name} user={user} version={1} status={row.properties.state} />
                                  </TableCell>
                                  <TableCell>
                                    <PasswordGenerate idSuscripcion={row.name} user={user} version={2} status={row.properties.state} />
                                  </TableCell>
                                  <TableCell>
                                    <ProductName scope={row.properties.scope} />
                                  </TableCell>
                                  <TableCell>
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
                                  </TableCell>
                                  <TableCell>
                                    {row.properties.state && row.properties.state !== 'cancelled' ? (
                                      <MenuOptions row={row} handleRename={handleRename} handleCancel={handleCancel} />
                                    ) : (null)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </>
                          ) : (null)}

                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Grid item xs={12}>
                      <Grid container direction='row' justifyContent='space-between'>
                        <Grid xs={3}>
                          {subscriptionsSkip > 0 || detailSubscriptionsSkip > 0 ? (
                            <div onClick={() => handlePreviousSubscriptions()} className={classes.pagination}>
                              <div className={classes.pagination__icon}>
                                <Icon id='MdNavigateBefore' />
                              </div>
                              <p>Anterior</p>
                            </div>

                          ) : (null)}
                        </Grid>
                        <Grid xs={1}>
                          {suscriptions.nextLink !== undefined ? (
                            <div onClick={() => handleNextSubscriptions(suscriptions.nextLink)} className={classes.pagination}>
                              <p className={classes.next}>Siguiente</p>
                              <div className={classes.pagination__icon}>
                                <Icon id='MdNavigateNext' />
                              </div>
                            </div>

                          ) : (null)}
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <h3 style={{ width: '100%', textAlign: 'center', color: '#53565A', fontSize: '1rem' }}>Informacion no disponible</h3>
                )
              }
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

Suscriptions.propTypes = {};

export default Suscriptions;
