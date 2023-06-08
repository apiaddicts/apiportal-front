import { Card, Container, Grid, Button, TableRow, TableCell, TableBody, TableContainer, Table, TableHead, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import { MdDelete } from 'react-icons/md';
import Icon from '../../../components/MdIcon/Icon';
import Spinner from '../../../components/Spinner';
import Title from '../../../components/Title';
import groupAction from '../../../redux/actions/groupAction';
import classes from './GroupDetailed.module.scss';
import Autocomplete from '../../../components/Autocomplete';
import { listProducts } from '../../../redux/actions/productsAction';
import InputResponse from '../../../components/Input/InputUI/InputResponse';
import useSearch from '../../../hooks/useSearch';

function GroupDetailed(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const { group, groupLoading, assignedProduct, groupProdSkip } = useSelector((state) => state.group);
  const { products } = useSelector((state) => state.products);
  const [viewRegister, setViewRegister] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [isAssigned, setIsAssigned] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const groupValidation = Yup.object().shape({
    displayName: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
  });

  const ProductGroupValidation = Yup.object().shape({
    productName: Yup.array(),
  });
  const handleGroupDetail = () => {
    if (params.id && params.id !== 'newGroup') {
      dispatch(groupAction.groupDetail(params.id));
    }
  };

  useEffect(() => {
    handleGroupDetail();
    if (products) {
      dispatch(listProducts(0, 0));
    }
    setViewRegister(params.id === 'newGroup');
  }, []);

  const displayName = group && Object.keys(group).length > 0 ? group?.properties?.displayName : '';
  const description = group && Object.keys(group).length > 0 ? group?.properties?.description : '';
  const groupId = params.id && params.id !== 'newGroup' ? params.id : '';
  const newGroupName = location && location.state && location.state.displayName && Object.keys(location.state).length > 0 ? location.state.displayName : '';
  const wasCreated = location && location.state && location.state.wasCreated && Object.keys(location.state).length > 0 ? location.state.wasCreated : '';
  const usr = location && location.state && location.state.usr && Object.keys(location.state).length > 0 ? location.state.usr : '';

  const fkUpdate = useFormik({
    initialValues: {
      displayName,
      description,
      groupId,
    },
    validationSchema: groupValidation,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      dispatch(groupAction.updateGroup(values));
      resetForm({
        displayName: '',
        description: '',
        groupId: '',
      });
      setReadOnly(true);
    },
  });

  const handleNewGroup = (values) => {
    if (wasCreated && usr) {
      dispatch(groupAction.addGroup(values, wasCreated, usr));
    } else {
      dispatch(groupAction.addGroup(values));
    }
  };

  const fkNewGroup = useFormik({
    initialValues: {
      displayName: newGroupName || '',
      description: '',
    },
    validationSchema: groupValidation,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      handleNewGroup(values);
      resetForm();
      // eslint-disable-next-line no-use-before-define
      goBack();
    },
  });

  const fkAddProduct = useFormik({
    initialValues: {
      productName: '',
      groupId,
    },
    validationSchema: ProductGroupValidation,
    enableReinitialize: true,
    onSubmit: ({ productName, groupId }, { resetForm }) => {
      dispatch(groupAction.addProductGroup(productName, groupId));
      resetForm();
    },
  });

  const goBack = () => {
    fkUpdate.handleReset();
    fkAddProduct.handleReset();
    fkNewGroup.handleReset();
    navigate(-1);
  };

  const arrProducts = products && Object.keys(products).length > 0 ? products.value.map((item) => {
    const { displayName } = item.properties;
    return {
      label: displayName,
      value: item.name,
    };
  }).filter((filter) => {
    return !filter.label.includes('$APP$');
  }) : [];

  const compareArrays = (array1, array2) => {
    return array1.filter((a) => {
      return !array2.some((b) => {
        return a.value === b.productName;
      });
    });
  };

  const unSelectedProducts = assignedProduct && Object.keys(assignedProduct).length > 0 && assignedProduct.data.length > 0 && arrProducts && Object.keys(arrProducts).length > 0 ? compareArrays(arrProducts, assignedProduct.data) : arrProducts;

  const handleDeleteProduct = (productName) => {
    dispatch(groupAction.deleteProductGroup(productName, params?.id));
  };

  useEffect(() => {
    if (fkAddProduct.values.productName.length > 0) {
      setIsAssigned(fkAddProduct.values.productName);
    }
    if (fkAddProduct.values.productName.length === 0) {
      setIsAssigned([]);
    }
  }, [fkAddProduct.values.productName]);

  const { formik } = useSearch({
    initialState: {
      name: '',
      description: '',
    },
  });

  const handleClickRow = (productId) => {
    navigate(`/developer/products/${productId}`);
  };

  const handlePrdGrpNext = () => {
    let filter = '';
    if (formik.values.name.trim().length > 0) {
      filter = `(contains(properties/displayName, '${formik.values.name.trim()}'))`;
    } else if (formik.values.description.trim().length > 0) {
      filter = `(contains(properties/description, '${formik.values.description.trim()}'))`;
    }
    dispatch(groupAction.getProdGroupNext(params.id, filter));
  };

  const handlePrdGrpPrev = () => {
    let filter = '';
    if (formik.values.name.trim().length > 0) {
      filter = `(contains(properties/displayName, '${formik.values.name.trim()}'))`;
    } else if (formik.values.description.trim().length > 0) {
      filter = `(contains(properties/description, '${formik.values.description.trim()}'))`;
    }
    dispatch(groupAction.getProdGroupPrev(params.id, filter));
  };

  const handleSearch = () => {
    if (formik.values.name.trim().length > 0) {
      dispatch(groupAction.filterProdGroupByName(params.id, formik.values.name.trim()));
    }
    if (formik.values.description.trim().length > 0) {
      dispatch(groupAction.filterProdGroupByDescription(params.id, formik.values.description.trim()));
    }
    if (formik.values.name.trim().length === 0 && formik.values.description.trim().length === 0) {
      dispatch(groupAction.productsByGroup(params.id));
      dispatch(groupAction.resetGroup());
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timer);
  }, [formik.values.name, formik.values.description]);

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: ' 0px', md: '97px !important' } }}>
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
      {!viewRegister ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 2fr))', alignItems: 'center' }}>
            {group && Object.keys(group).length > 0 && groupLoading === false ? (
              <div>
                <Title text={group?.properties?.displayName} />
              </div>
            ) : null}
          </div>
          { groupLoading ? (<Spinner styles={{ height: '500px' }} title='Cargando...' />) : (
            <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
              <Grid item xs={12}>
                <form className={classes.grid__wrapper} onSubmit={fkUpdate.handleSubmit}>
                  <div className={classes.column__flex}>
                    <div className={classes.wrapper__input}>
                      <p>Nombre:</p>
                      <input
                        type='text'
                        id='displayName'
                        name='displayName'
                        className={classes.wrapper__input__field}
                        onChange={fkUpdate.handleChange}
                        onBlur={fkUpdate.handleBlur}
                        value={fkUpdate.values.displayName}
                        disabled={readOnly}
                      />
                    </div>
                    {fkUpdate.errors.displayName && fkUpdate.touched.displayName ? (<div className={classes.error__msg}>{fkUpdate.errors.displayName}</div>) : null}
                  </div>
                  {readOnly ? (
                    <div className={classes.wrapper__buttons}>
                      <Button variant='text' startIcon={<EditIcon />} onClick={() => setReadOnly(!readOnly)} className='custom__btn__text'>
                        Editar
                      </Button>
                    </div>
                  ) : (
                    <div className={classes.wrapper__buttons}>
                      <Button onClick={() => { handleGroupDetail(); setReadOnly(!readOnly); fkUpdate.handleReset(); }} className='custom__btn__text'>Cancelar</Button>
                      <Button className='custom__btn custom__btn__primary' type='submit'>Guardar cambios</Button>
                    </div>
                  )}
                </form>
              </Grid>
              <Grid item xs={12} mt={4}>
                <div className={classes.column__flex}>
                  <div className={classes.wrapper__textarea}>
                    <p>Descripción</p>
                    <textarea
                      id='description'
                      name='description'
                      onChange={fkUpdate.handleChange}
                      onBlur={fkUpdate.handleBlur}
                      className={classes.wrapper__textarea__field}
                      disabled={readOnly}
                      value={fkUpdate.values.description}
                    >
                      {fkUpdate.values.description}
                    </textarea>
                  </div>
                  {fkUpdate.errors.description && fkUpdate.touched.description ? (<div className={classes.error__msg}>{fkUpdate.errors.description}</div>) : null}
                </div>
              </Grid>
            </Card>
          )}

          {groupLoading === false ? (
            <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)', overflow: 'visible' }}>
              <div className={classes.admin__form__container__header}>
                <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Añadir producto</div>
              </div>
              <div>
                <form onSubmit={fkAddProduct.handleSubmit}>
                  <div className='row align_items__center mt-4 justify_content__between'>
                    <div className='flex-lg-9 flex-sm-12'>
                      <Autocomplete
                        options={unSelectedProducts}
                        value={fkAddProduct.values.productName}
                        onChange={(value) => fkAddProduct.setFieldValue('productName', value)}
                        isMulti={true}
                        className='wrapper__autocomplete'
                        placeholderText=''
                      />
                    </div>
                    <div className='flex-lg-3 flex-sm-12 pb-1'>
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
              </div>
            </Card>
          ) : null}

          {assignedProduct && Object.keys(assignedProduct).length > 0 && assignedProduct.data.length > 0 && groupLoading === false ? (
            <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)', overflow: 'visible' }}>
              <div className={classes.admin__form__container__header}>
                <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Productos</div>
              </div>
              <Grid item sx={{ marginBottom: '31px' }} xs={12}>
                <div className='wrapper__table__wide__display'>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <div className='custom__table__cell__title'>
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
                          </TableCell>
                          <TableCell>
                            <div className='custom__table__cell__title'>
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
                          </TableCell>
                          <TableCell>
                            <div className='custom__table__cell__title' />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {assignedProduct && Object.keys(assignedProduct).length > 0 && assignedProduct.data.length > 0 ? assignedProduct.data.map((product, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                          >
                            <TableCell onClick={() => handleClickRow(product.productName)}>
                              <p className='custom__table__cell__content custom__table__cell__content__link'>{product.displayName}</p>
                            </TableCell>
                            <TableCell>
                              <p className='custom__table__cell__content custom__table__cell__content__description'>{product.description}</p>
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleDeleteProduct(product.productName)}>
                                <MdDelete color='#E4002B' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )) : null}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div className='wrapper__table__small__display'>
                  {assignedProduct && Object.keys(assignedProduct).length > 0 && assignedProduct.data.length > 0 ? assignedProduct.data.map((product, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                    >
                      <TableCell onClick={() => handleClickRow(product.productName)}>
                        <p className='custom__table__cell__content custom__table__cell__content__link'>{product.displayName}</p>
                      </TableCell>
                      <TableCell>
                        <p className='custom__table__cell__content custom__table__cell__content__description'>{product.description}</p>
                      </TableCell>
                    </TableRow>
                  )) : null}
                </div>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction='row' justifyContent='space-between'>

                  <Grid item xs={3}>
                    {groupProdSkip > 0 ? (
                      <div className='pagination' onClick={() => handlePrdGrpPrev()} role='button' tabIndex={0}>
                        <div className='pagination__icon'>
                          <Icon id='MdNavigateBefore' />
                        </div>
                        <p>Anterior</p>
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item xs={1}>
                    {assignedProduct && Object.keys(assignedProduct).length > 0 && assignedProduct.paging !== undefined && assignedProduct?.paging?.links?.next !== '' && assignedProduct?.paging?.links?.next !== undefined ? (
                      <div className='pagination' onClick={() => handlePrdGrpNext()} role='button' tabIndex={0}>
                        <p>Siguiente</p>
                        <div className='pagination__icon'>
                          <Icon id='MdNavigateNext' />
                        </div>
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          ) : null}

        </>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 2fr))', alignItems: 'center' }}>
            <div>
              <Title text='Nuevo grupo' />
            </div>
          </div>
          <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
            <Grid item xs={12}>
              <form className={classes.grid__wrapper} onSubmit={fkNewGroup.handleSubmit}>
                <div className={classes.column_flex}>
                  <div className={classes.wrapper__input}>
                    <p>Nombre:</p>
                    <input
                      type='text'
                      id='displayName'
                      name='displayName'
                      className={classes.wrapper__input__field}
                      onChange={fkNewGroup.handleChange}
                      onBlur={fkNewGroup.handleBlur}
                      value={fkNewGroup.values.displayName}
                      disabled={!readOnly}
                    />
                  </div>
                  {fkNewGroup.errors.displayName && fkNewGroup.touched.displayName ? (<div className={classes.error__msg}>{fkNewGroup.errors.displayName}</div>) : null}
                </div>
                {readOnly ? (
                  <div className={classes.wrapper__buttons}>
                    <Button onClick={() => { handleGroupDetail(); setReadOnly(!readOnly); fkNewGroup.handleReset(); }} className='custom__btn__text'>Cancelar</Button>
                    <Button className='custom__btn custom__btn__primary' type='submit'>Guardar cambios</Button>
                  </div>
                ) : (
                  null
                )}
              </form>
            </Grid>
            <Grid item xs={12} mt={4}>
              <div className={classes.column__flex}>
                <div className={classes.wrapper__textarea}>
                  <p>Descripción</p>
                  <textarea
                    id='description'
                    name='description'
                    onChange={fkNewGroup.handleChange}
                    onBlur={fkNewGroup.handleBlur}
                    className={classes.wrapper__textarea__field}
                    disabled={!readOnly}
                    value={fkNewGroup.values.description}
                  >
                    {fkNewGroup.values.description}
                  </textarea>
                </div>
                {fkNewGroup.errors.description && fkNewGroup.touched.description ? (<div className={classes.error__msg}>{fkNewGroup.errors.description}</div>) : null}
              </div>
            </Grid>
          </Card>
        </>
      )}
    </Container>
  );
}

export default GroupDetailed;
