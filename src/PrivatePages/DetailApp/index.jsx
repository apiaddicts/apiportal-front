/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';

import { Container, Card, Grid, Box, TableHead, TableRow, TableCell, Table, TableContainer, TableBody } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';

import Title from '../../components/Title/Title';
import Btn from '../../components/Buttons/Button';

import Spinner from '../../components/Spinner';
import Icon from '../../components/MdIcon/Icon';
import InputResponse from '../../components/Input/InputUI/InputResponse';
import PasswordGenerate from '../../components/common/InputMUI/passwordGenerate';

import { getProductDetail, resetProduct, filterProductAPIsByName, filterProductAPIsByDescription, getProductApis, getProductApiNext, getProductApiPrevious } from '../../redux/actions/productsAction';
import { subscribeToAProduct } from '../../redux/actions/subscriptionsAction';

import useSearch from '../../hooks/useSearch';

import 'moment/locale/es';

import classes from './detail.module.scss';

moment.locale('es');
function AppsDetail(props) {
  const { product, productApis, productSubscriptions, spinnerApis, productsApisSkip } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { loadingCreateSubscription } = useSelector((state) => state.suscripcions);

  const dispatch = useDispatch();
  const params = useParams();

  const [searchSuscription, setSearchSuscription] = useState('');

  const { formik } = useSearch({
    initialState: {
      name: '',
      description: '',
      suscription: '',
    },
  });

  useEffect(() => {

    if (formik.values.name.trim().length >= 3) {
      dispatch(filterProductAPIsByName(params.id, formik.values.name));
    }

    if (formik.values.description.trim().length >= 3) {
      dispatch(filterProductAPIsByDescription(params.id, formik.values.description));
    }

    if (formik.values.name.trim().length === 0 && formik.values.description.trim().length === 0) {
      dispatch(getProductApis(params.id));
    }

  }, [formik.values.name, formik.values.description]);

  useEffect(() => {
    if (formik.values.suscription.trim().length > 1) {
      setSearchSuscription(formik.values.suscription);
    }

    if (formik.values.suscription.trim().length === 0) {
      setSearchSuscription('');
    }

  }, [formik.values.suscription]);

  useEffect(() => {
    if (params.id && product && Object.keys(product).length === 0) {
      dispatch(getProductDetail(params.id));
    }

  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetProduct());
    };
  }, []);

  const handleNextProductApi = (url) => {
    dispatch(getProductApiNext(url, params.id));
  };

  const handlePreviousProductApi = () => {
    dispatch(getProductApiPrevious(params.id));
  };

  const handleSubmitSuscription = () => {
    if (searchSuscription.trim().length > 0 && user && Object.keys(user).length > 0) {
      const data = {
        properties: {
          name: searchSuscription,
          scope: `/products/${product.name}`,
          appType: 'developerPortal',
        },
      };
      dispatch(subscribeToAProduct(data, user.name, params.id));
    }
  };

  return (
    <Container className='py-10 table-left'>
      {product && Object.keys(product).length === 0 ? (
        <Spinner title='Cargando...' />
      ) : (

        <div>
          <Link to={-1}>
            <div className={classes.return}>
              <div>
                <Icon id='MdNavigateBefore' />
              </div>
              <span>VOLVER</span>
            </div>
          </Link>
          <Title text={product.name} />
          {/* Card description */}
          <Card sx={{ borderRadius: '20px', marginTop: '1rem', paddingTop: '3px', paddingLeft: '41px', paddingRight: '45px', paddingBottom: '40px', marginBottom: '50px' }}>
            <Grid style={{ marginTop: '0px' }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <span className='subtitle-2'>
                  <b>Descripción</b>
                </span>
              </Grid>
            </Grid>
            <Grid style={{ marginTop: '-25px' }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12}>
                <p className='subtitle-2'>
                  {product.properties.description}
                </p>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px' }}>
            <Title text='Suscripción' divider={false} />
            {productSubscriptions && Object.keys(productSubscriptions).length > 0 && productSubscriptions.count > 0 ? (
              <Box sx={{ height: '100%' }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
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
                          Estado
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productSubscriptions.value && productSubscriptions.value.length > 0 ? (
                        <>
                          {productSubscriptions.value.map((row, i) => (
                            <TableRow
                              key={i}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                            >
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
                                {row.properties.state}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ) : (null)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <Box sx={{ height: '100%' }}>
                {loadingCreateSubscription ? (
                  <Spinner styles={{ height: '200px' }} title='Subscribiendo...' />
                ) : (
                  <div className={classes.form_suscriptione} style={{ height: '36px' }}>
                    <div className={classes.form_suscriptione__input}>
                      <InputResponse
                        name='suscription'
                        type='text'
                        label='Nombre de la suscripción a este producto'
                        onChange={formik.handleChange}
                        value={formik.values.suscription}
                      />
                    </div>
                    <div className={classes.form_suscriptione____btn}>
                      <Btn size='responsive' onClick={handleSubmitSuscription} styles={searchSuscription.length > 0 ? 'primary' : 'greey-primary'}>SUSCRIBIRME</Btn>
                    </div>
                  </div>

                )}
              </Box>
            )}
          </Card>
          {/* APis del producto */}
          <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Title text='APIs del producto' divider={false} />
              </Grid>
            </Grid>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <>
                        <div className={classes.cell_title}>
                          <h2>Nombre</h2>
                          <Icon id='MdExpandMore' />
                        </div>
                        <div style={{ height: '36px', marginTop: '14px' }}>
                          <InputResponse
                            name='name'
                            type='text'
                            label='Buscar Nombre'
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldValue('description', '');
                            }}
                            value={formik.values.name}
                          />
                        </div>
                      </>
                    </TableCell>
                    <TableCell>
                      <>

                        <div className={classes.cell_title}>
                          <h2>Descripcion</h2>
                          <Icon id='MdExpandMore' />
                        </div>
                        <div style={{ height: '36px', marginTop: '14px' }}>
                          <InputResponse
                            name='description'
                            type='text'
                            label='Buscar Descripcion'
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldValue('name', '');
                            }}
                            value={formik.values.description}
                          />
                        </div>
                      </>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productApis && Object.keys(productApis).length > 0 && spinnerApis !== true ? (
                    <>
                      {productApis.value.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                        >
                          <TableCell component='th' scope='row'>
                            <p className={classes.cell_name}>{row.name}</p>
                          </TableCell>
                          <TableCell>
                            <p className={classes.cell_description}>
                              {row.properties.description}
                            </p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <Spinner styles={{ height: '200px' }} title='Cargando...' />
                  )}

                </TableBody>
              </Table>
            </TableContainer>
            <Grid item xs={12}>
              <Grid container spacing={4} direction='row' justifyContent='space-between'>
                <Grid item xs={3}>
                  {productsApisSkip > 0 ? (
                    <div onClick={() => handlePreviousProductApi()} className={classes.pagination}>
                      <Icon id='MdNavigateBefore' />
                      <p>Anterior</p>
                    </div>
                  ) : (null)}

                </Grid>
                <Grid item xs={1}>
                  {productApis.nextLink !== undefined ? (
                    <div onClick={() => handleNextProductApi()} className={classes.pagination}>
                      <p className={classes.next}>Siguente</p>
                      <Icon id='MdNavigateNext' />
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

export default AppsDetail;
