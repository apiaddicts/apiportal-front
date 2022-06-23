/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';

import { Container, TableHead, TableRow, TableCell, Table, TableContainer, TableBody, Card, Grid } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import Title from '../components/Title/Title';
import Spinner from '../components/Spinner';
import SearchInput from '../components/Input/SearchInput';
import InputResponse from '../components/Input/InputUI/InputResponse';
import Icon from '../components/MdIcon/Icon';

import useSearch from '../hooks/useSearch';

import { filterProductsByDescription, filterProductsByName, listProducts, searchProducts, getProductosNext, getProductPrevious, resetProduct } from '../redux/actions/productsAction';

import classes from '../styles/pages/app.module.scss';

function Apps(props) {
  const { products, spinner, productsSkip } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formik } = useSearch({
    initialState: {
      search: '',
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (formik.values.search.trim().length >= 3) {
      dispatch(searchProducts(formik.values.search));
    }
    if (formik.values.name.trim().length >= 3) {
      dispatch(filterProductsByName(formik.values.name));
    }

    if (formik.values.description.trim().length >= 3) {
      dispatch(filterProductsByDescription(formik.values.description));
    }

    if (formik.values.search.trim().length === 0 && formik.values.name.trim().length === 0 && formik.values.description.trim().length === 0) {
      dispatch(listProducts());
    }
  }, [formik.values.search, formik.values.name, formik.values.description]);

  useEffect(() => {
    if (products && Object.keys(products).length === 0 && productsSkip === 0) {
      dispatch(listProducts());
    }

  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetProduct());
    };
  }, []);

  const handleClickRow = (id) => {
    navigate(`/developer/products/${id}`);
  };

  const handleNextProduct = (url) => {
    dispatch(getProductosNext(url));
  };

  const handlePreviousProduct = () => {
    dispatch(getProductPrevious());
  };

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: ' 0px', md: '97px !important' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 2fr))', alignItems: 'center' }}>
        <div>
          <Title text='Productos' />
        </div>
        <div className='margin_top'>
          <SearchInput
            name='search'
            type='text'
            placeholder='Buscar Producto'
            icon
            borderRadius={50}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue('description', '');
              formik.setFieldValue('name', '');
            }}
            value={formik.values.search}
          />
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
                        <TableCell style={{ width: '100px' }} size='small'>
                          <>
                            <div className={classes.cell_title}>
                              <h2 className='text-uppercase'>Nombre</h2>
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
                                  formik.setFieldValue('search', '');
                                }}
                                value={formik.values.name}
                              />
                            </div>
                          </>
                        </TableCell>
                        <TableCell>
                          <>
                            <div className={classes.cell_title}>
                              <h2 className='text-uppercase'>Descripcion</h2>
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
                                  formik.setFieldValue('search', '');
                                }}
                                value={formik.values.description}
                              />
                            </div>
                          </>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products && Object.keys(products).length > 0 ? (
                        <>
                          {products.value.map((row, i) => (
                            <TableRow
                              key={i}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                              onClick={() => handleClickRow(row.name)}
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
                      ) : (null)}

                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className={classes.wrapper_apps__small__display}>
                {products && Object.keys(products).length > 0 ? (
                  <>
                    {products.value.map((row, i) => (
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
            </Grid>
            <Grid item xs={12}>
              <Grid container direction='row' justifyContent='space-between'>
                <Grid xs={3}>
                  {productsSkip > 0 ? (
                    <div onClick={() => handlePreviousProduct()} className={classes.pagination}>
                      <div className={classes.pagination__icon}>
                        <Icon id='MdNavigateBefore' />
                      </div>
                      <p>Anterior</p>
                    </div>

                  ) : (null)}
                </Grid>
                <Grid xs={1}>
                  {products.nextLink !== undefined ? (
                    <div onClick={() => handleNextProduct(products.nextLink)} className={classes.pagination}>
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

Apps.propTypes = {};

export default Apps;
