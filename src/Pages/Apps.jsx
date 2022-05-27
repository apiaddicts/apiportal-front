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

  }, [dispatch, products]);

  useEffect(() => {
    return () => {
      dispatch(resetProduct());
    };
  }, []);

  const handleClickRow = (id) => {
    navigate(`/apps/${id}`);
  };

  const handleNextProduct = (url) => {
    dispatch(getProductosNext(url));
  };

  const handlePreviousProduct = () => {
    dispatch(getProductPrevious());
  };

  return (
    <Container fixed className='py-10 table-left'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Title text='Productos' />
        </Grid>
        <Grid item xs={6}>
          <SearchInput
            name='search'
            type='text'
            placeholder='Buscar'
            icon
            onChange={formik.handleChange}
            value={formik.values.search}
          />
        </Grid>
      </Grid>
      { spinner ? (
        <Spinner styles={{ height: '500px' }} title='Cargando...' />
      ) : (
        <Grid style={{ marginTop: '20px' }} container spacing={2}>
          <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
            <Grid item sx={{ marginBottom: '31px' }} xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '100px' }} size='small'>
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
                              onChange={formik.handleChange}
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
                              onChange={formik.handleChange}
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
                        {products.value.map((row) => (
                          <TableRow
                            key={row.name}
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
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4} direction='row' justifyContent='space-between'>
                <Grid item xs={3}>
                  {productsSkip > 0 ? (
                    <div onClick={() => handlePreviousProduct()} className={classes.pagination}>
                      <Icon id='MdNavigateBefore' />
                      <p>Anterior</p>
                    </div>

                  ) : (null)}
                </Grid>
                <Grid item xs={1}>
                  {products.nextLink !== undefined ? (
                    <div onClick={() => handleNextProduct(products.nextLink)} className={classes.pagination}>
                      <p>Siguiente</p>
                      <Icon id='MdNavigateNext' />
                    </div>

                  ) : (null)}
                </Grid>
              </Grid>
            </Grid>

          </Card>
        </Grid>

      )}

    </Container>
  );
}

Apps.propTypes = {};

export default Apps;
