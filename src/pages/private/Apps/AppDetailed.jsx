import { Button, Card, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { MdDelete } from 'react-icons/md';
import Icon from '../../../components/MdIcon/Icon';
import Spinner from '../../../components/Spinner';
import Title from '../../../components/Title';
import appsActions from '../../../redux/actions/appsActions';
import Autocomplete from '../../../components/Autocomplete';
import { listApis } from '../../../redux/actions/libraryAction';
import InputResponse from '../../../components/Input/InputUI/InputResponse';
import InputKeys from '../../../components/Input/InputKeys';
import useSearch from '../../../hooks/useSearch';
import InformationFormModel from './FormModel/InformationFormModel';
import CustomSelect from '../../../components/Input/InputUI/CustomSelect';

function AppDetailed(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const { appsLoading, secretKeys, appApis, appApisAll, appSuscription, appApisLoading, appSuscriptionLoading, appApisSkip } = useSelector((state) => state.apps);
  const { user } = useSelector((state) => state.user);
  const [readOnly, setReadOnly] = useState(true);
  const { apis } = useSelector((state) => state.library);
  const [toggleExpField, setToggleExpField] = useState(false);
  const [isAssigned, setIsAssigned] = useState([]);
  const navigate = useNavigate();

  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
  };
  const { formField } = InformationFormModel;

  useEffect(() => {
    if (params && params.id) {
      dispatch(appsActions.getAppDetail(params.id));
      dispatch(appsActions.getAppDetailSuscription(params.id));
      dispatch(listApis(0, 0, ''));
    }
  }, [params.id]);

  const creationDate = secretKeys && Object.keys(secretKeys).length > 0 ? moment(secretKeys.createdDateTime).format('LL') : '';
  const description = secretKeys && Object.keys(secretKeys).length > 0 ? secretKeys.description : '';
  const appName = secretKeys && Object.keys(secretKeys).length > 0 ? secretKeys.displayName : '';
  const callbackUri = secretKeys && Object.keys(secretKeys).length > 0 ? secretKeys?.web?.redirectUris[0] : '';
  const primaryKey = appSuscription && Object.keys(appSuscription).length > 0 && appSuscription?.appSubscriptionKey?.primaryKey ? appSuscription?.appSubscriptionKey?.primaryKey : '';
  const secondaryKey = appSuscription && Object.keys(appSuscription).length > 0 && appSuscription?.appSubscriptionKey?.secondaryKey ? appSuscription?.appSubscriptionKey?.secondaryKey : '';
  const appId = secretKeys && Object.keys(secretKeys).length > 0 ? secretKeys?.appId : '';
  const clientSecret = appSuscription && Object.keys(appSuscription).length > 0 ? appSuscription?.passwordCredentials : '';
  const expDateClientSecret = appSuscription && Object.keys(appSuscription).length > 0 ? moment(appSuscription?.secretExpirationDate).format('DD-MM-YYYY - hh:mm') : '';
  const arrApis = apis && Object.keys(apis).length > 0 ? apis.value.map((apis) => {
    return {
      value: apis.name,
      label: apis.properties.displayName,
    };
  }) : [];

  const apisApp = appApis && Object.keys(appApis).length > 0 ? appApis?.apis?.map((api) => {
    return {
      id: api.id,
      displayName: api.displayName,
      description: api?.description || '',
      product: api.products.join(', '),
    };
  }) : [];
  const _submitApisToApp = (values) => {

    const apisName = values.apiName.map((api) => {
      const { value } = api;
      return value;
    });

    const data = {
      applicationObjectId: params.id,
      apis: apisName,
    };

    dispatch(appsActions.addApisApp(data, params.id));
  };

  const formikUpd = useFormik({
    initialValues: {
      description,
      callback: callbackUri,
    },
    validationSchema: Yup.object().shape({
      description: Yup.string(),
      callback: Yup.string().url('Please insert a valid url').test('isValidCallback', 'Url must not contain this domain!', (value) => { return value ? !value.startsWith(window.location.origin) : true; }),
    }),
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const data = {
        displayName: appName,
        description: values.description,
        web: {
          redirectUris: [
            values.callback,
          ],
        },
      };

      dispatch(appsActions.updateApp(data, params.id));
      resetForm({
        description: '',
        callback: '',
      });
      setReadOnly(true);
    },
  });

  const formikApis = useFormik({
    initialValues: {
      apiName: [],
    },
    validationSchema: Yup.object().shape({
      apiName: Yup.array(),
    }),
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      _submitApisToApp(values);
      resetForm();
    },
  });

  const handleDeleteApi = (apiId) => {
    const dataRequest = {
      objId: params.id,
      apiName: apiId,
    };
    dispatch(appsActions.deleteApiApp(dataRequest));
  };

  const regeneratePrimaryKey = () => {
    const data = {
      userId: user?.name,
      subscriptionId: appSuscription?.appSubscriptionKey?.name,
      appId: params?.id,
    };
    dispatch(appsActions.regeneratePrimaryKey(data));
  };

  const regenerateSecondaryKey = () => {
    const data = {
      userId: user?.name,
      subscriptionId: appSuscription?.appSubscriptionKey?.name,
      appId: params?.id,
    };
    dispatch(appsActions.regenerateSecondaryKey(data));
  };

  const regenerateClientSecret = () => {
    setToggleExpField(!toggleExpField);
  };

  const handleRegisterB2c = () => {
    navigate('/developer/apps/user-b2c');
  };

  const handleNextAppApis = () => {
    dispatch(appsActions.getAppsApisNext(params.id));
  };

  const handlePreviousAppApis = () => {
    dispatch(appsActions.getAppsApisPrevious(params.id));
  };

  const handleClickCell = (id) => {
    navigate(`/developer/apis/${id}`);
  };

  const initialValues = {
    expiration: '',
  };

  const validationSchema = Yup.object().shape({
    expiration: Yup.string(),
  });

  const _handleSubmit = (values, actions) => {
    const secretName = `Client_Secret_${values.expiration}_${(Math.random() + 1).toString(36).substring(7)}`;
    const data = {
      objId: params?.id,
      name: secretName,
      expiration: values.expiration,
    };
    dispatch(appsActions.regenerateClientSecret(data));
    actions.resetForm();
    setToggleExpField(false);
  };

  const { formik } = useSearch({
    initialState: {
      name: '',
      product: '',
      description: '',
    },
  });

  const handleSearch = () => {
    if (formik.values.name.trim().length > 0) {
      dispatch(appsActions.filterAppApisByName(params.id, formik.values.name.trim()));
    }
    if (formik.values.product.trim().length > 0) {
      dispatch(appsActions.filterAppApisByProduct(params.id, formik.values.product.trim()));
    }
    if (formik.values.description.trim().length > 0) {
      dispatch(appsActions.filterAppApisByDescription(params.id, formik.values.description.trim()));
    }
    if (formik.values.name.trim().length === 0 && formik.values.product.trim().length === 0 && formik.values.description.trim().length === 0) {
      dispatch(appsActions.getAppDetailApis(params.id));
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timer);
  }, [formik.values.name, formik.values.product, formik.values.description]);

  useEffect(() => {
    if (formikApis.values.apiName.length > 0) {
      setIsAssigned(formikApis.values.apiName);
    }
    if (formikApis.values.apiName.length === 0) {
      setIsAssigned([]);
    }
  }, [formikApis.values.apiName]);

  return (
    <Container fixed className='container__padding'>
      <div className='back__btn'>
        <Link to={-1}>
          <div className='return'>
            <div>
              <Icon id='MdKeyboardBackspace' />
            </div>
            <span>VOLVER</span>
          </div>
        </Link>
      </div>
      <div className='grid__container'>
        <div>
          {secretKeys && Object.keys(secretKeys).length > 0 && appsLoading === false ? (
            <div className='wrapper__title'>
              <Title text={appName} />
              <Button className='custom__btn custom__btn__primary wrapper__title__btn' onClick={handleRegisterB2c}>Registrar usuario B2C</Button>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
          {appsLoading ? (<Spinner styles={{ height: '500px' }} title='Cargando...' />) : (
            <Grid item xs={12}>
              <form onSubmit={formikUpd.handleSubmit}>
                <div className='wrapper__content__right'>
                  {readOnly ? (
                    <div className='wrapper__buttons'>
                      <Button variant='text' startIcon={<EditIcon />} onClick={() => { toggleReadOnly(); formikUpd.handleReset(); }} className='custom__btn__text'>
                        Editar
                      </Button>
                    </div>
                  ) : (
                    <div className='wrapper__buttons'>
                      <Button onClick={() => { toggleReadOnly(); formikUpd.handleReset(); }} className='custom__btn__text'>Cancelar</Button>
                      <Button className='custom__btn custom__btn__primary' type='submit'>Guardar cambios</Button>
                    </div>
                  )}
                </div>
                <div className='grid__wrapper__2xl'>
                  <div className='wrapper__input'>
                    <p className='text-uppercase font-weight-bold'>Usuario:</p>
                    <input
                      type='text'
                      id='user'
                      className='wrapper__input__field'
                      value={user && Object.keys(user).length > 0 ? user.properties.email : ''}
                      disabled
                    />
                  </div>
                  <div className='wrapper__input'>
                    <p className='text-uppercase font-weight-bold'>Fecha de creación:</p>
                    <input
                      type='text'
                      id='creationDate'
                      className='wrapper__input__field'
                      value={creationDate}
                      disabled
                    />
                  </div>
                </div>

                <div className='wrapper__input mb-5'>
                  <p className='text-uppercase font-weight-bold'>Callback:</p>
                  <input
                    type='text'
                    id='callback'
                    name='callback'
                    className='wrapper__input__field'
                    disabled={readOnly}
                    onChange={formikUpd.handleChange}
                    onBlur={formikUpd.handleBlur}
                    value={formikUpd.values.callback}
                  />
                </div>
                <div className='wrapper__textarea'>
                  <p className='text-uppercase font-weight-bold'>Descripción:</p>
                  <textarea
                    id='description'
                    name='description'
                    className='wrapper__textarea__field'
                    disabled={readOnly}
                    onChange={formikUpd.handleChange}
                    onBlur={formikUpd.handleBlur}
                    value={formikUpd.values.description}
                  >
                    {formikUpd.values.description}
                  </textarea>
                </div>

              </form>
            </Grid>
          )}
        </Card>

        <div className='font-fs-joey fs__36 font-weight-bold text__primary'>APIs</div>
        <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%', overflow: 'inherit !important' }}>
          {appApisLoading ? (<Spinner styles={{ height: '500px' }} title='Cargando...' />) : (
            <>
              <Grid item xs={12} marginBottom={1}>
                <form onSubmit={formikApis.handleSubmit}>
                  <div className='row align_items__center mt-4 justify_content__between'>
                    <div className='flex-lg-9 flex-sm-12'>
                      <Autocomplete
                        options={arrApis}
                        value={formikApis.values.apiName}
                        onChange={(value) => formikApis.setFieldValue('apiName', value)}
                        isMulti={true}
                        className='wrapper__autocomplete'
                        placeholderText=''
                      />
                    </div>
                    <div className='flex-lg-3 flex-sm-12'>
                      <Button
                        type='submit'
                        styles='primary'
                        className={isAssigned.length > 0 ? 'custom__btn custom__btn__primary' : 'custom__btn custom__btn__disabled'}
                        disabled={!isAssigned.length > 0}
                        fullWidth
                      >
                        Añadir
                      </Button>
                    </div>
                  </div>
                </form>
              </Grid>
              <Grid item sx={{ marginButton: '31px' }} xs={12}>
                <div className='wrapper__table__wide__display'>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: '100%' }} size='small'>
                            <>
                              <div className='custom__table__cell__title'>
                                <h2 className='text-uppercase'>API</h2>
                              </div>
                              <div style={{ height: '36px', marginTop: '14px' }}>
                                <InputResponse
                                  name='name'
                                  type='text'
                                  label='Buscar Nombre'
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue('products', '');
                                    formik.setFieldValue('description', '');
                                  }}
                                  value={formik.values.name}
                                />
                              </div>
                            </>
                          </TableCell>
                          <TableCell style={{ width: '100%' }} size='small'>
                            <>
                              <div className='custom__table__cell__title'>
                                <h2 className='text-uppercase'>Producto</h2>
                              </div>
                              <div style={{ height: '36px', marginTop: '14px' }}>
                                <InputResponse
                                  name='product'
                                  type='text'
                                  label='Buscar Producto'
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue('name', '');
                                    formik.setFieldValue('description', '');
                                  }}
                                  value={formik.values.product}
                                />
                              </div>
                            </>
                          </TableCell>
                          <TableCell style={{ width: '100%' }} size='small'>
                            <>
                              <div className='custom__table__cell__title'>
                                <h2 className='text-uppercase'>Descripción</h2>
                              </div>
                              <div style={{ height: '36px', marginTop: '14px' }}>
                                <InputResponse
                                  name='description'
                                  type='text'
                                  label='Buscar Descripción'
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue('name', '');
                                    formik.setFieldValue('product', '');
                                  }}
                                  value={formik.values.description}
                                />
                              </div>
                            </>
                          </TableCell>
                          <TableCell style={{ width: '100%' }} size='small'>
                            <div />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {apisApp && Object.keys(apisApp).length > 0 ? apisApp.map((row, index) => (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}>
                            <TableCell component='th' scope='row' onClick={() => handleClickCell(row.id)}>
                              <div className='flex__column'>
                                <p className='custom__table__cell__content custom__table__cell__content__link'>{row.displayName}</p>
                              </div>
                            </TableCell>

                            <TableCell>
                              <p className='custom__table__cell__content custom__table__cell__content__description'>{row.product}</p>
                            </TableCell>

                            <TableCell>
                              <p className='custom__table__cell__content custom__table__cell__content__description'>{row.description}</p>
                            </TableCell>

                            <TableCell>
                              <IconButton onClick={() => handleDeleteApi(row.id)}>
                                <MdDelete color='#E4002B' />
                              </IconButton>
                            </TableCell>

                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={4} align='center'>
                              <p className='custom__table__data__notfound'>Información no disponible</p>
                            </TableCell>
                          </TableRow>
                        )}

                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <Grid item xs={12}>
                  <Grid container direction='row' justifyContent='space-between'>
                    <Grid item xs={3}>
                      {appApisSkip > 0 ? (
                        <div className='pagination' onClick={() => handlePreviousAppApis()} role='button' tabIndex={0}>
                          <div className='pagination__icon'>
                            <Icon id='MdNavigateBefore' />
                          </div>
                          <p>Anterior</p>
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={1}>
                      {apisApp && Object.keys(apisApp).length > 0 && appApisAll && Object.keys(appApisAll).length > 0 && appApisAll?.paging && appApisAll?.paging?.links?.next !== '' && appApisAll?.paging?.links?.next !== undefined ? (
                        <div onClick={() => handleNextAppApis()} className='pagination' role='button' tabIndex={0}>
                          <p>Siguiente</p>
                          <div className='pagination__icon'>
                            <Icon id='MdNavigateNext' />
                          </div>
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Card>

        <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Conexión</div>
        <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
          {appSuscriptionLoading ? (<Spinner styles={{ height: '500px' }} title='Cargando...' />) : (
            <>
              <Grid item xs={12}>
                <p className='font-weight-bold text-uppercase mb-5 pb-2'>Claves de Aplicación</p>
                <div className='row align_items__center mt-5 justify_content__between'>
                  <div className='flex-lg-6 flex-sm-12'>
                    <InputKeys label='Id de Aplicación' type='password' value={appId} disabled />
                  </div>
                  <div className='flex-lg-6 flex-sm-12'>
                    <InputKeys label='Secreto del cliente' type='password' value={clientSecret} disabled regenerate={true} handleRegenerate={regenerateClientSecret} />
                    {toggleExpField ? (
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={_handleSubmit}
                      >
                        {({ isSubmitting, values }) => (
                          <Form id='formRegenerate' className='mt-7'>
                            <CustomSelect name='expiration' label={formField.expiration.label} placeholder='Seleccione una opción' items={formField.expiration.items} itemText='text' itemValue='value' />
                            <div className='mt-4 d-flex justify_content__between'>
                              <Button type='reset' styles='primary' onClick={regenerateClientSecret}>
                                Cancelar
                              </Button>
                              <Button type='submit' disabled={isSubmitting} className='custom__btn custom__btn__primary mt-5'>
                                Regenerar
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    ) : (<small className='fs__12 px-4'>{`Fecha de expiración: ${expDateClientSecret}`}</small>)}
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} marginTop={3}>
                <p className='font-weight-bold text-uppercase mb-5 pb-2'>Suscripción</p>
                <form>
                  <div className='row align_items__center mt-5 justify_content__between'>
                    <div className='flex-lg-6 flex-sm-12'>
                      <div className='w-full'>
                        <InputKeys label='Primary Key' type='password' value={primaryKey} disabled regenerate={true} handleRegenerate={regeneratePrimaryKey} />
                      </div>
                    </div>
                    <div className='flex-lg-6 flex-sm-12'>
                      <InputKeys label='Secondary Key' type='password' value={secondaryKey} disabled regenerate={true} handleRegenerate={regenerateSecondaryKey} />
                    </div>
                  </div>
                </form>
              </Grid>
            </>
          )}
        </Card>
      </div>

    </Container>
  );
}

export default AppDetailed;
