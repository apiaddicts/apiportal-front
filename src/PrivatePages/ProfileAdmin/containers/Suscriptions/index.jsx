
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Container, TableHead, TableRow, TableCell, Table, TableContainer, TableBody } from '@mui/material';

import moment from 'moment';
import PasswordGenerate from '../../../../components/common/InputMUI/passwordGenerate';
import ProductName from '../Product';

import { listUserSubscriptions, resetSubscriptionsUser } from '../../../../redux/actions/subscriptionsAction';

import 'moment/locale/es';

import classes from './Suscriptions.module.scss';

moment.locale('es');
function Suscriptions({ user }) {

  const { suscripcionsUser } = useSelector((state) => state.suscripcions);

  const dispatch = useDispatch();

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
    <Container className='my-10'>
      <div className={classes.wrapper}>
        <div className='w-full'>
          <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Suscripciones</div>
          {suscripcionsUser && Object.keys(suscripcionsUser).length > 0 && suscripcionsUser.value.length > 0 ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '100px' }} size='small'>
                      Nombre
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
                      Estado
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
                            <p>{row.properties.displayName}</p>
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
                            {row.properties.state}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (null)}

                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h3 styles={{ width: '100%', textAlign: 'center' }}>No hay datos</h3>
          )}
        </div>
      </div>
    </Container>
  );
}

Suscriptions.propTypes = {};

export default Suscriptions;
