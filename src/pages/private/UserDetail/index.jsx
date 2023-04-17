/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdDelete, MdMailOutline } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { getUserDetail } from '../../../redux/actions/usersAction';
import groupAction from '../../../redux/actions/groupAction';
import Autocomplete from '../../../components/Autocomplete';
import useFormUserConfig from '../../../hooks/useFormUser';
import Input from '../../../components/Input';
import Button from '../../../components/Buttons/Button';
import Title from '../../../components/Title';
import Select from '../../../components/Input/Select';
import classes from './user-detail.module.scss';
import Icon from '../../../components/MdIcon/Icon';
import { changeStatus } from '../../../redux/actions/userAction';
import getMessage from '../../../services/messages';
import InputResponse from '../../../components/Input/InputUI/InputResponse';
import useSearch from '../../../hooks/useSearch';
import Spinner from '../../../components/Spinner';
import appsActions from '../../../redux/actions/appsActions';

function UserDetail() {
  const { userDetail, spinnerUser, errorUser } = useSelector((state) => state.users);
  const { responseError } = useSelector((state) => state.user);
  const { groups, assignedGroups, groupLoading, errorGroup, groupAssignedSkip } = useSelector((state) => state.group);
  const { allowedApps, appsLoading, error: errorApps, notificationSuccMsg } = useSelector((state) => state.apps);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [isAssigned, setIsAssigned] = useState([]);

  const notify = (msg) => toast(msg);

  useEffect(() => {
    if (params.id) {
      dispatch(getUserDetail(params.id));
    }
    if (errorUser && Object.keys(errorUser).length > 0) {
      const msg = getMessage(errorUser.errors[0].code);
      notify(msg);
    }
    if (responseError && Object.keys(responseError).length > 0) {
      const msg = getMessage(responseError.errors[0].code);
      notify(msg);
    }
    if (errorGroup && Object.keys(errorGroup).length > 0) {
      const msg = getMessage(errorGroup.errors[0].code);
      notify(msg);
    }
    if (errorApps && Object.keys(errorApps).length > 0) {
      const msg = getMessage(errorApps.errors[0].description);
      notify(msg);
    }
  }, []);
  useEffect(() => {
    if (notificationSuccMsg) {
      return toast.success(notificationSuccMsg, {
        icon: '✅',
        style: {
          backgroundColor: '#02d65a',
        },
      });
    }
  }, [notificationSuccMsg]);

  const handleSubmit = async (values) => {
    const data = {
      state: values.state,
      firstName: values.first_name.trim(),
      lastName: values.last_name.trim(),
    };
    dispatch(changeStatus(data, params.id));
  };

  useEffect(() => {
    dispatch(groupAction.listGroups(0, 0));
    dispatch(appsActions.getAllowedApps(params.id));
    return () => {
      dispatch(groupAction.resetGroup());
    };
  }, []);

  useEffect(() => {
    if (Object.keys(groups).length === 0) {
      dispatch(groupAction.listGroups(0, 0));
    }
    if (Object.keys(allowedApps).length === 0) {
      dispatch(appsActions.getAllowedApps(params.id));
    }
  }, []);

  const arrGroups = groups && Object.keys(groups).length > 0 ? groups.value.map((item, index) => {
    const { displayName } = item.properties;
    return {
      value: item.name,
      label: displayName,
    };
  }) : [];

  const name = userDetail && Object.keys(userDetail).length > 0 && userDetail.properties && Object.keys(userDetail.properties).length > 0 ? userDetail.properties.firstName : '';
  const lastName = userDetail && Object.keys(userDetail).length > 0 && userDetail.properties && Object.keys(userDetail.properties).length > 0 ? userDetail.properties.lastName : '';
  const email = userDetail && Object.keys(userDetail).length > 0 && userDetail.properties && Object.keys(userDetail.properties).length > 0 ? userDetail.properties.email : '';
  const state = userDetail && Object.keys(userDetail).length > 0 && userDetail.properties && Object.keys(userDetail.properties).length > 0 ? userDetail.properties.state : '';

  const labelsUser = [
    {
      id: 'first_name',
      initialValue: name,
      placeholder: 'John',
      validate: 'first_name',
      label: 'Nombre',
      type: 'text',
      disabled: state === 'pending',
    },
    {
      id: 'last_name',
      initialValue: lastName,
      placeholder: 'Doe',
      label: 'Apellido',
      validate: 'last_name',
      type: 'text',
      disabled: state === 'pending',
    },
    {
      id: 'email',
      initialValue: email,
      placeholder: 'youremail@domain.com',
      label: 'Correo electrónico',
      type: 'email',
      disabled: true,
    },
    {
      id: 'state',
      initialValue: state,
      placeholder: 'Estado',
      label: 'Estado',
      type: 'select',
      disabled: state === 'pending',
    },
  ];

  const status = state && state !== 'pending' ? [
    { value: 'active', text: 'Habilitado' },
    { value: 'blocked', text: 'Deshabilitado' },
  ] : [
    { value: 'active', text: 'Habilitado' },
    { value: 'pending', text: 'Pendiente de confirmar correo' },
    { value: 'blocked', text: 'Deshabilitado' },
  ];

  const assignGroupSchema = Yup.object().shape({
    groupId: Yup.array(),
    userId: Yup.string(),
  });

  const formConfig = useFormUserConfig(labelsUser, handleSubmit);
  const formikAssign = useFormik({
    initialValues: {
      groupId: '',
      userId: params.id,
    },
    enableReinitialize: true,
    validationSchema: assignGroupSchema,
    onSubmit: (values, { resetForm }) => {
      const { userId, groupId } = values;
      dispatch(groupAction.assignGroup(userId, groupId));
      resetForm();
    },
  });

  const handleCellClick = (groupName) => {
    navigate(`/developer/groups/${groupName}`);
  };
  const handleCellClickApp = (AppObjId) => {
    navigate(`/developer/apps/${AppObjId}`);
  };

  const handleDeleteGroup = (groupId) => {
    dispatch(groupAction.deleteMemberGroup(groupId, params.id));
  };

  const handlePrevious = () => {
    dispatch(groupAction.getGroupAssignedPrevious(params.id));
  };

  const handleNext = () => {
    dispatch(groupAction.getGroupAssignedNext(params.id));
  };

  const compareArrays = (a, b) => {
    return a.filter((x) => {
      return !b.some((y) => {
        return x.value === y.name;
      });
    });
  };

  const handleNotify = (appObjId) => {
    dispatch(appsActions.notifyAllowedApp(appObjId));
    dispatch(appsActions.getAllowedApps(params.id));
  };

  const unSelectedGroups = assignedGroups && Object.keys(assignedGroups).length > 0 && arrGroups && Object.keys(arrGroups).length > 0 ? compareArrays(arrGroups, assignedGroups?.data?.value) : arrGroups;

  useEffect(() => {
    if (formikAssign.values.groupId.length > 0) {
      setIsAssigned(formikAssign.values.groupId);
    }
    if (formikAssign.values.groupId.length === 0) {
      setIsAssigned([]);
    }
  }, [formikAssign.values.groupId]);

  const { formik } = useSearch({
    initialState: {
      name: '',
      description: '',
    },
  });

  const handleSearch = () => {
    if (formik.values.name.trim().length > 0) {
      dispatch(groupAction.filterGroupAssignedByName(params.id, formik.values.name.trim()));
    }
    if (formik.values.description.trim().length > 0) {
      dispatch(groupAction.filterGroupAssignedByDescription(params.id, formik.values.description.trim()));
    }
    if (formik.values.name.trim().length === 0 && formik.values.description.trim().length === 0) {
      dispatch(groupAction.groupsByUser(params.id));
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timer);
  }, [formik.values.name, formik.values.description]);

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
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
      <div className={classes.main__admin}>
        {userDetail && Object.keys(userDetail).length > 0 && spinnerUser === false ? (
          <div className={classes.admin}>
            <div className='w-full mb-5'>
              <Title text='Detalle de usuario' />
            </div>
            <div className={classes.admin__form}>
              <form onSubmit={formConfig.handleSubmit} noValidate>
                <div className={classes.admin__form__container}>
                  <div className={classes.admin__form__container__header}>
                    <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Datos personales</div>
                  </div>
                  <div className='row'>
                    {labelsUser.map((field) => {
                      return field.type === 'select' ? (
                        <div className='flex-lg-6 flex-sm-12'>
                          <Select key={field.id} field={field} formik={formConfig} label={field.label} items={status} itemText='text' itemValue='value' />
                        </div>
                      ) : (
                        <div className='flex-lg-6 flex-sm-12'>
                          <Input key={field.id} field={field} formik={formConfig} />
                        </div>
                      );
                    })}
                  </div>
                  {state !== 'pending' && (
                    <div className='row align_items__center mt-4 justify_content__between'>
                      <div className='flex-lg-3 flex-sm-12 display_flex align_items__bottom justify_content__end ml-auto mb-2'>
                        <Button
                          type='submit'
                          styles='primary'
                        >
                          Guardar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : (null)}
      </div>

      <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)', overflow: 'visible' }}>
        <div className={classes.admin__form__container__header}>
          <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Asignar grupo</div>
        </div>
        <div>
          <form onSubmit={formikAssign.handleSubmit}>
            <div className='row align_items__center mt-4 justify_content__between'>
              <div className='flex-lg-9 flex-sm-12'>
                <Autocomplete
                  options={unSelectedGroups}
                  value={formikAssign.values.groupId}
                  onChange={(value) => formikAssign.setFieldValue('groupId', value)}
                  isMulti={true}
                  isCreatable={true}
                  usr={params.id}
                  className='wrapper__autocomplete'
                  placeholderText=''
                />
              </div>
              <div className='flex-lg-3 flex-sm-12 pb-1'>
                <Button
                  type='submit'
                  styles={isAssigned.length > 0 ? 'primary' : 'greey-primary'}
                  disabled={!isAssigned.length > 0}
                >
                  Añadir
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>

      {assignedGroups && Object.keys(assignedGroups).length > 0 && groupLoading === false ? (
        <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)', overflow: 'visible' }}>
          <div className={classes.admin__form__container__header}>
            <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Grupos Asignados</div>
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
                    {assignedGroups && Object.keys(assignedGroups).length > 0 ? assignedGroups.data.value.map((group, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                      >
                        <TableCell onClick={() => handleCellClick(group.name)}>
                          <p className='custom__table__cell__content custom__table__cell__content__link'>{group.properties.displayName}</p>
                        </TableCell>
                        <TableCell>
                          <p className='custom__table__cell__content custom__table__cell__content__description'>{group.properties.description}</p>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDeleteGroup(group.name)}>
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
              {assignedGroups && Object.keys(assignedGroups).length > 0 ? assignedGroups.data.value.map((group, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                >
                  <TableCell>
                    <p className='custom__table__cell__content custom__table__cell__content__link'>{group.properties.displayName}</p>
                  </TableCell>
                  <TableCell>
                    <p className='custom__table__cell__content custom__table__cell__content__description'>{group.properties.description}</p>
                  </TableCell>
                </TableRow>
              )) : null}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction='row' justifyContent='space-between'>
              <Grid item xs={3}>
                {groupAssignedSkip > 0 ? (
                  <div className='pagination' onClick={() => handlePrevious()} role='button' tabIndex={0}>
                    <div className='pagination__icon'>
                      <Icon id='MdNavigateBefore' />
                    </div>
                    <p>Anterior</p>
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={1}>
                {assignedGroups && Object.keys(assignedGroups).length > 0 && assignedGroups.paging.links.next !== '' && assignedGroups.paging.links.next !== undefined ? (
                  <div className='pagination' onClick={() => handleNext()} role='button' tabIndex={0}>
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
      ) : (<Spinner styles={{ height: '500px' }} title='Cargando...' />)}

      {allowedApps && Object.keys(allowedApps).length >= 0 && appsLoading === false ? (
        <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)', overflow: 'visible' }}>
          <div className={classes.admin__form__container__header}>
            <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Aplicaciones permitidas</div>
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
                      </TableCell>
                      <TableCell>
                        <div className='custom__table__cell__title'>
                          <h2>Descripción</h2>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='custom__table__cell__title' />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allowedApps && Object.keys(allowedApps).length > 0 ? allowedApps.map((app, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                      >
                        <TableCell onClick={() => handleCellClickApp(app.applicationObjectId)}>
                          <p className='custom__table__cell__content custom__table__cell__content__link'>{app.displayName}</p>
                        </TableCell>
                        <TableCell>
                          <p className='custom__table__cell__content custom__table__cell__content__description'>{app.description}</p>
                        </TableCell>
                        <TableCell>
                          {
                            app.notified ?
                              (null) : (
                                <IconButton onClick={() => handleNotify(app.applicationObjectId)}>
                                  <MdMailOutline color='#1e2422' />
                                </IconButton>
                              )
                          }
                        </TableCell>
                      </TableRow>
                    )) : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className='wrapper__table__small__display'>
              {allowedApps && Object.keys(allowedApps).length > 0 ? allowedApps.map((app, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                >
                  <TableCell>
                    <p className='custom__table__cell__content custom__table__cell__content__link'>{app.displayName}</p>
                  </TableCell>
                  <TableCell>
                    <p className='custom__table__cell__content custom__table__cell__content__description'>{app.description}</p>
                  </TableCell>
                </TableRow>
              )) : null}
            </div>
          </Grid>
        </Card>
      ) : (<Spinner styles={{ height: '500px' }} title='Cargando...' />)}
    </Container>
  );
}

export default UserDetail;
