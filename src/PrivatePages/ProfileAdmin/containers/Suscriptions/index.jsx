
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableHead, TableRow, TableCell, Table, TableContainer, TableBody, Chip, Container } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import moment from 'moment';
import PasswordGenerate from '../../../../components/common/InputMUI/passwordGenerate';
import ProductName from '../Product';
import {
  listUserSubscriptions,
  resetSubscriptionsUser,
  renameSubscription,
  cancelSubscription } from '../../../../redux/actions/subscriptionsAction';
import 'moment/locale/es';
import MenuOptions from '../../../../components/MenuOptions';
import classes from './Suscriptions.module.scss';

moment.locale('es');
function Suscriptions({ user }) {

  const { suscripcionsUser, renameSubscriptionResponse, cancelSubscriptionResponse } = useSelector((state) => state.suscripcions);
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
    dispatch(cancelSubscription(user.name, rowCancel.name, data));
  };

  const handleKeyDown = (row, e) => {
    if (e.key === 'Enter') {
      const data = {
        'properties': {
          'name': e.target.value,
        },
      };
      dispatch(renameSubscription(user.name, row.name, data));
    } else if (e.key === 'Escape') {
      setEdit('');
    }
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
    if (suscripcionsUser && Object.keys(user).length > 0 && Object.keys(suscripcionsUser).length === 0) {
      dispatch(listUserSubscriptions(user.name));
    }
  }, [suscripcionsUser]);

  useEffect(() => {
    return () => {
      dispatch(resetSubscriptionsUser());
    };
  }, []);

  return (
    <div>
      <div className={classes.wrapper}>
        <Container>
          <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Suscripciones</div>
          {suscripcionsUser && Object.keys(suscripcionsUser).length > 0 && suscripcionsUser.value.length > 0 ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '325px' }}>
                      Nombre
                    </TableCell>
                    <TableCell style={{ width: '70px' }}>
                      Solicitud
                    </TableCell>
                    <TableCell>
                      Primary key
                    </TableCell>
                    <TableCell>
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
                  {suscripcionsUser.value && suscripcionsUser.value.length > 0 ? (
                    <>
                      {suscripcionsUser.value.map((row, i) => (
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
                            <PasswordGenerate idSuscripcion={row.name} user={user} version={1} />
                          </TableCell>
                          <TableCell>
                            <PasswordGenerate idSuscripcion={row.name} user={user} version={2} />
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
                            <MenuOptions row={row} handleRename={handleRename} handleCancel={handleCancel} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (null)}

                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h3 style={{ width: '100%', textAlign: 'center', color: '#53565A', fontSize: '1rem' }}>Informacion no disponible</h3>
          )}
        </Container>
      </div>
    </div>
  );
}

Suscriptions.propTypes = {};

export default Suscriptions;
