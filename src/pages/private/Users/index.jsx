import { Card, Chip, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import Title from '../../../components/Title';
import usersAction from '../../../redux/actions/usersAction';

function index(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listUsersReq, listUsersRes } = useSelector((state) => state.users);

  const handleRowClick = (userId) => {
    navigate(`/developer/users/${userId}`);
  };

  useEffect(() => {
    dispatch(usersAction.listUsers());
  }, []);

  return (
    <Container fixed className='container__padding'>
      <div className='grid__container'>
        <div>
          <Title text='Usuarios' />
        </div>
      </div>
      { listUsersReq ? (<Spinner styles={{ height: '500px' }} title='Cargando...' />) : (
        <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
          <Grid item sx={{ marginBottom: '31px' }} xs={12}>
            <div className='wrapper__table__wide__display'>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <div className='custom__table__cell__title'>
                          <h2 className='text-uppercase'>NOMBRE COMPLETO</h2>
                        </div>
                      </TableCell>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <div className='custom__table__cell__title'>
                          <h2 className='text-uppercase'>CORREO ELECTRÓNICO</h2>
                        </div>
                      </TableCell>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <div className='custom__table__cell__title'>
                          <h2 className='text-uppercase'>ESTADO</h2>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { listUsersRes && Object.keys(listUsersRes).length > 0 ? (
                      <>
                        {listUsersRes.value.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                            onClick={() => handleRowClick(row.name)}
                          >
                            <TableCell component='th' scope='row'>
                              <p className='custom__table__cell__content custom__table__cell__content__link'>
                                {`${row.properties.firstName} ${row.properties.lastName}`}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className='custom__table__cell__content custom__table__cell__content__description'>
                                {row.properties.email}
                              </p>
                            </TableCell>
                            <TableCell>
                              <Chip
                                color='secondary'
                                title={row.properties.state.toUpperCase() === 'PENDING' ? 'PENDIENTE' : row.state === 'ACTIVE' ? 'APROBADO' : row.state === 'BLOCKED' ? 'BLOQUEADO' : ''}
                                icon={<FiberManualRecordIcon fontSize='10px' />}
                                label={row.properties.state.toUpperCase() === 'ACTIVE' ? 'APROBADO' : row.properties.state.toUpperCase() === 'PENDING' ? 'PENDIENTE' : row.properties.state.toUpperCase() === 'BLOCKED' ? 'BLOQUEADO' : 'NA'}
                                sx={{
                                  color: `${row.properties.state.toUpperCase() === 'ACTIVE' ? '#97D700' : row.properties.state.toUpperCase() === 'PENDING' ? '#F1B434' : row.properties.state.toUpperCase() === 'BLOCKED' ? '#F54B5E' : ''} !important`,
                                  background: `${row.properties.state.toUpperCase() === 'ACTIVE' ? 'rgba(151, 215, 0, 0.10)' : row.properties.state.toUpperCase() === 'PENDING' ? 'rgba(241, 180, 52, 0.1)' : row.properties.state.toUpperCase() === 'BLOCKED' ? 'rgba(245, 75, 94, 0.10)' : ''} !important`,
                                  lineHeight: '16px',
                                  fontWeight: '700 !important',
                                  letterSpacing: '0.8px !important',
                                  padding: '2px !important',
                                  textTransform: 'uppercase !important',
                                  display: 'flex !important',
                                  width: '63%',
                                  alignItems: 'center',
                                  height: '25px',
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align='center'>Información no disponible</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Card>
      ) }
    </Container>
  );
}

export default index;
