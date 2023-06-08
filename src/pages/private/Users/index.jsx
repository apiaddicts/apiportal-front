import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, TableHead, TableRow, TableCell, Table, TableContainer, TableBody, Card, Grid, Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// toast from 'react-hot-toast';
import { listUsers, getUsersNext, getUsersPrevious, filterUsersByName, filterUsersByEmail, resetUsers } from '../../../redux/actions/usersAction';
import Title from '../../../components/Title';
import Spinner from '../../../components/Spinner';
import Icon from '../../../components/MdIcon/Icon';
import classes from './users.module.scss';
//import getMessage from '../../../services/messages';
import InputResponse from '../../../components/Input/InputUI/InputResponse';
import useSearch from '../../../hooks/useSearch';

function Users(props) {
  const { users, spinner, usersSkip } = useSelector((state) => state.users);

  //const notify = (msg) => toast(msg);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickRow = (id) => {
    navigate(`/developer/users/${id}`);
  };

  const { formik } = useSearch({
    initialState: {
      name: '',
      email: '',
    },
  });

  const handleSearch = () => {
    if (formik.values.name.trim().length >= 1) {
      dispatch(filterUsersByName(formik.values.name.trim()));
    }

    if (formik.values.email.trim().length >= 1) {
      dispatch(filterUsersByEmail(formik.values.email.trim()));
    }

    if (formik.values.name.trim().length === 0 && formik.values.email.trim().length === 0) {
      dispatch(listUsers());
      dispatch(resetUsers());
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timer);
  }, [formik.values.name, formik.values.email]);

  const handleNextUsers = () => {
    let filter = '';
    if (formik.values.name.trim().length >= 0) {
      filter = `(contains(properties/firstName,'${formik.values.name.trim()}') or contains(properties/lastName,'${formik.values.name.trim()}'))`;
    } else if (formik.values.email.trim().length >= 0) {
      filter = `(contains(properties/email,'${formik.values.email.trim()}'))`;
    }
    dispatch(getUsersNext(filter));
  };

  const handlePreviousUsers = () => {
    let filter = '';
    if (formik.values.name.trim().length >= 0) {
      filter = `(contains(properties/firstName,'${formik.values.name.trim()}') or contains(properties/lastName,'${formik.values.name.trim()}'))`;
    } else if (formik.values.email.trim().length >= 0) {
      filter = `(contains(properties/email,'${formik.values.email.trim()}'))`;
    }
    dispatch(getUsersPrevious(filter));
  };

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: ' 0px', md: '97px !important' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 2fr))', alignItems: 'center' }}>
        <div>
          <Title text='Usuarios' />
        </div>
      </div>
      { spinner ? (
        <Spinner styles={{ height: '500px' }} title='Cargando...' />
      ) : (
        <div>
          <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
            <Grid item sx={{ marginBottom: '31px' }} xs={12}>
              <div className={classes.wrapper_apps__wide__display}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <div className={classes.cell_title}>
                            <h2 className='text-uppercase'>NOMBRE COMPLETO</h2>
                          </div>
                          <div style={{ height: '36px', marginTop: '14px' }}>
                            <InputResponse
                              name='name'
                              type='text'
                              label='Buscar Nombre'
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('email', '');
                              }}
                              value={formik.values.name}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={classes.cell_title}>
                            <h2 className='text-uppercase'>CORREO ELECTRÓNICO</h2>
                          </div>
                          <div style={{ height: '36px', marginTop: '14px' }}>
                            <InputResponse
                              name='email'
                              type='text'
                              label='Buscar Correo'
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('name', '');
                              }}
                              value={formik.values.email}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={classes.cell_title}>
                            <h2 className='text-uppercase'>ESTADO</h2>
                          </div>
                          <div style={{ height: '36px', marginTop: '14px' }} />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users && Object.keys(users).length > 0 ? (
                        <>
                          {users.value.map((row, i) => (
                            <TableRow
                              key={i}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                              onClick={() => handleClickRow(row.name)}
                            >
                              <TableCell component='th' scope='row'>
                                <p className={classes.cell_name}>
                                  {`${row.properties.firstName} ${row.properties.lastName}`}
                                </p>
                              </TableCell>
                              <TableCell>
                                <p className={classes.cell_email}>
                                  {row.properties.email}
                                </p>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  color='secondary'
                                  title={row.properties.state.toUpperCase() === 'PENDING' ? 'PENDIENTE' : row.state === 'ACTIVE' ? 'APROBADO' : row.state === 'BLOCKED' ? 'BLOQUEADO' : ''}
                                  icon={<FiberManualRecordIcon fontSize='10px' />}
                                  label={row.properties.state.toUpperCase() === 'ACTIVE' ? 'HABILITADO' : row.properties.state.toUpperCase() === 'PENDING' ? 'PENDIENTE DE CONFIRMAR CORREO' : row.properties.state.toUpperCase() === 'BLOCKED' ? 'DESHABILITADO' : 'NA'}
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
                      ) : (null)}

                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className={classes.wrapper_apps__small__display}>
                {users && Object.keys(users).length > 0 ? (
                  <>
                    {users.value.map((row, i) => (
                      <div className={`w-full py-3 ${classes.border__bottom}`} key={row.id}>
                        <div
                          className='fs__12 text__secondary ls__02 cpointer'
                          onClick={() => handleClickRow(row.name)}
                          role='button'
                          tabIndex={0}
                        >
                          {`${row.properties.firstName} ${row.properties.lastName}`}
                        </div>
                        <div className='fs__12 text__gray__gray_darken mt-2'>{row.properties.email}</div>
                      </div>
                    ))}
                  </>
                ) : (null)}
              </div>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction='row' justifyContent='space-between'>
                <Grid item xs={3}>
                  {usersSkip > 0 ? (
                    <div onClick={() => handlePreviousUsers()} className={classes.pagination} role='button' tabIndex={0}>
                      <div className={classes.pagination__icon}>
                        <Icon id='MdNavigateBefore' />
                      </div>
                      <p>Anterior</p>
                    </div>

                  ) : (null)}
                </Grid>
                <Grid item xs={1}>
                  {users.nextLink !== undefined ? (
                    <div onClick={() => handleNextUsers(users.nextLink)} className={classes.pagination} role='button' tabIndex={0}>
                      <p className={classes.next}>Siguiente</p>
                      <div className={classes.pagination__icon}>
                        <Icon id='MdNavigateNext' />
                      </div>
                    </div>
                  ) : (null)}
                </Grid>
              </Grid>
            </Grid>

          </Card>
        </div>
      )}
    </Container>
  );
}

Users.propTypes = {};

export default Users;
