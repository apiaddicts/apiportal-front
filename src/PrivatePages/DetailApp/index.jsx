/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';

import { Container, Card, Grid, Box, TableHead, TableRow, TableCell, Table, TableContainer, TableBody } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Title from '../../components/Title/Title';
import Btn from '../../components/Buttons/Button';
import { fieldsAppSandbox, fieldsAppPre } from '../AddApp/field';
import CustomTooltip from '../../components/common/ToolTip';
import { TypographyUI } from '../../components/common/TypographyMUI/style';
import TextField from '../../components/common/InputMUI';
import Spinner from '../../components/Spinner';
import Icon from '../../components/MdIcon/Icon';
import InputResponse from '../../components/Input/InputUI/InputResponse';

import { getProductDetail, resetProduct, filterProductAPIsByName, filterProductAPIsByDescription, getProductApis, getProductApiNext, getProductApiPrevious } from '../../redux/actions/productsAction';

import useSearch from '../../hooks/useSearch';

import useNewApp from '../../hooks/useNewApp';
import classes from './detail.module.scss';

function AppsDetail(props) {
  const { product, productApis, productSubscriptions, spinnerApis, productsApisSkip } = useSelector((state) => state.products);
  const handleSubmit = async (dataForm) => {
    console.log(dataForm);
  };

  const dispatch = useDispatch();
  const params = useParams();

  const formConfig = useNewApp(fieldsAppSandbox, handleSubmit);
  const formConfigPre = useNewApp(fieldsAppPre, handleSubmit);

  const { formik } = useSearch({
    initialState: {
      name: '',
      description: '',
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
    if (params.id && product && Object.keys(product).length === 0) {
      dispatch(getProductDetail(params.id));
    }
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
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
                    <CustomTooltip text='ETORNO SANDBOX'>
                      ?
                    </CustomTooltip>
                    <TypographyUI>
                      ENTORNO SANDBOX
                    </TypographyUI>
                  </Box>
                  <div className='row'>
                    {fieldsAppSandbox.map((field) => (
                      <div key={field.id} className='flex-lg-4 flex-sm-12'>
                        <TextField field={field} formik={formConfig} iconCopy iconEye />
                      </div>
                    ))}
                  </div>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
                    <CustomTooltip text='ENTORNO PRE'>
                      ?
                    </CustomTooltip>
                    <TypographyUI>
                      ENTORNO PRE
                    </TypographyUI>
                  </Box>
                  <div className='row'>
                    {fieldsAppPre.map((field) => (
                      <div key={field.id} className='flex-lg-4 flex-sm-12'>
                        <TextField field={field} formik={formConfigPre} iconCopy iconEye />
                      </div>
                    ))}
                  </div>
                </Box>
                <Box sx={{ mt: 5 }}>
                  <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
                    <CustomTooltip text='ENTORNO PRODUCCIÓN'>
                      ?
                    </CustomTooltip>
                    <TypographyUI>
                      ENTORNO PRODUCCIÓN
                    </TypographyUI>
                  </Box>
                </Box>
                <Grid container>
                  <Grid item xs={4}>
                    <div className={classes.btn}>
                      <Btn styles='primary'>
                        Solicitar pase a producción
                      </Btn>
                    </div>

                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box sx={{ height: '100%' }}>
                <div className={classes.form_suscriptione} style={{ height: '36px' }}>
                  <div className={classes.form_suscriptione__input}>
                    <InputResponse
                      type='text'
                      label='Nombre de la suscripción a este producto'
                    />
                  </div>
                  <div className={classes.form_suscriptione____btn}>
                    <Btn size='responsive' styles='greey-primary'>SUSCRIBIRME</Btn>
                  </div>
                </div>
              </Box>
            )}
          </Card>

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
                      <p>Siguente</p>
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
