
/* eslint-disable */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Link, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetail, resetProduct, filterProductAPIsByName, filterProductAPIsByDescription, getProductApis, getProductApiNext, getProductApiPrevious } from '../../../redux/actions/productsAction';
import { subscribeToAProduct } from '../../../redux/actions/subscriptionsAction';
import { Container, Card, Grid, Box, TableHead, TableRow, TableCell, Table, TableContainer, TableBody } from '@mui/material';
import Title from '../../../components/Title';
import Btn from '../../../components/Buttons/Button';
import Suscriptions from '../../../components/Suscriptions';
import SuscriptionsVertical from '../../../components/SuscriptionsVertical';
import Spinner from '../../../components/Spinner';
import Icon from '../../../components/MdIcon/Icon';
import InputResponse from '../../../components/Input/InputUI/InputResponse';
import useSearch from '../../../hooks/useSearch';
import classes from './product-detail.module.scss';

moment.locale('es');
function ProductDetail(props) {
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


  const suscriptionValidate = Object.keys(productSubscriptions).length > 0 && productSubscriptions.value.length > 0 ? productSubscriptions.value.filter((item) => item.properties.state !== 'cancelled') : [];
  const limits = product.properties && Object.keys(product.properties).length > 0 ? product.properties.subscriptionsLimit : 0;

  return (
    <div>
      {product && Object.keys(product).length === 0 ? null : (
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
      )}
      <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
        {product && Object.keys(product).length === 0 ? (
          <Spinner styles={{ height: '200px' }} title='Cargando...' />
        ) : (

          <div>
            <Title text={product.properties.displayName} />
            {/* Card description */}
            <Card sx={{ borderRadius: '20px', marginTop: '1rem', paddingTop: '3px', paddingLeft: '41px', paddingRight: '45px', paddingBottom: '40px', marginBottom: '40px', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)' }}>
              <Grid style={{ marginTop: '0px' }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <span className='subtitle-2 text__gray__gray_darken font-weigth-semi-bold text-uppercase'>
                    <b>Descripción</b>
                  </span>
                </Grid>
              </Grid>
              <Grid style={{ marginTop: '-25px' }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                  <p className='body-2 text__gray__gray_darken'>
                    {product.properties.description}
                  </p>
                </Grid>
              </Grid>
            </Card>
            {productSubscriptions && Object.keys(productSubscriptions).length > 0 && productSubscriptions.count > 0 ? (
              <>
                <div className={classes.wrapper_subscriptions__wide__display}>
                  <Suscriptions user={user} suscriptions={productSubscriptions} title='Suscripción' productId={params.id}/>
                </div>
                <div className={classes.wrapper_subscriptions__small__display}>
                  <SuscriptionsVertical user={user} suscriptions={productSubscriptions} title='Suscripción' productId={params.id}/>
                </div>
              </>
            ) : (
              null
            ) }

            {limits === null || suscriptionValidate.length < limits ? (
                <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '40px', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)' }}>
                  {suscriptionValidate.length === 0 && productSubscriptions.count === 0 ? (
                    <Title text='Suscripción' divider={false} stylesTitle={{ fontSize: '2.25rem' }} />
                  ) : (null)} 
                  {loadingCreateSubscription ? (
                    <Spinner styles={{ height: '100px' }} title='Cargando...' />
                  ) : (
                    <div className={classes.form_suscriptione}>
                      <div className={classes.form_suscriptione__input}>
                        <InputResponse
                          name='suscription'
                          type='text'
                          label='Nombre de la suscripción a este producto'
                          onChange={formik.handleChange}
                          value={formik.values.suscription}
                        />
                      </div>
                      <div className={classes.form_suscriptione__btn}>
                        <Btn size='responsive' onClick={handleSubmitSuscription} styles={searchSuscription.length > 0 ? 'primary-blue' : 'primary-blue'}>SUSCRIBIRME</Btn>
                      </div>
                    </div>

                  )}
                  </Card>
            ) : (null)}

            {/* APis del producto */}
            <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Title text='APIs del producto' divider={false} stylesTitle={{ fontSize: '2.25rem' }} />
                </Grid>
              </Grid>
              <div className={classes.wrapper_apps__wide__display}>
                <TableContainer>
                  <Table sx={{ minWidth: 650, marginBottom: '20px', }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <>
                            <div className={classes.cell_title}>
                              <h2>Nombre</h2>
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
                              <h2>Descripción</h2>
                            </div>
                            <div style={{ height: '36px', marginTop: '14px' }}>
                              <InputResponse
                                name='description'
                                type='text'
                                label='Buscar Descripción'
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
                              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                            >
                              <TableCell component='th' scope='row'>
                                <HashLink smooth to={`/developer/apis/${row.name}#detailApi`}>
                                  <p className={classes.cell_name}>{row.name}</p>
                                </HashLink>
                              </TableCell>
                              <TableCell>
                                <HashLink smooth to={`/developer/apis/${row.name}#detailApi`}>
                                  <p className={classes.cell_description}>
                                    {row.properties.description}
                                  </p>
                                </HashLink>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Spinner styles={{ height: '200px' }} title='Cargando...' />
                          </TableCell>
                        </TableRow>
                      )}

                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className={classes.wrapper_apps__small__display}>
                {productApis && Object.keys(productApis).length > 0 ? (
                  <>
                    {productApis.value.map((row, i) => (
                      <div className={`w-full py-3 ${classes.border__bottom}`} key={row.id}>
                        <div
                          className='fs__12 text__secondary ls__02 cpointer'
                          onClick={() => handleClickRow(row.name)}
                        >
                          {row.name}
                        </div>
                        <div className='fs__12 text__gray__gray_darken mt-2'>{row.properties.description}</div>
                      </div>
                    ))}
                  </>
                ) : (null)}
              </div>
              
              <div className='display_flex justify_content__between mt-2'>
                <div>
                  {productsApisSkip > 0 ? (
                    <div onClick={() => handlePreviousProductApi()} className={classes.pagination}>
                      <div className={classes.pagination__icon}>
                        <Icon id='MdNavigateBefore' />
                      </div>
                      <p>Anterior</p>
                    </div>
                  ) : (null)}
                </div>
                <div>
                  {productApis.nextLink !== undefined ? (
                    <div onClick={() => handleNextProductApi()} className={classes.pagination}>
                      <p className={classes.next}>Siguiente</p>
                      <div className={classes.pagination__icon}>
                        <Icon id='MdNavigateNext' />
                      </div>
                    </div>
                  ) : (null)}
                </div>
              </div>
            </Card>
          </div>

        )}

      </Container>
    </div>
  );
}

export default ProductDetail;
