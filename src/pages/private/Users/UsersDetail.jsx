import { Card, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Icon from '../../../components/MdIcon/Icon';
import Spinner from '../../../components/Spinner';
import Title from '../../../components/Title';
import usersAction from '../../../redux/actions/usersAction';
import Button from '../../../components/Buttons/Button';
import Autocomplete from '../../../components/Autocomplete';
import useFormUserConfig from '../../../hooks/useFormUser';
import groupAction from '../../../redux/actions/groupAction';
import { compareArrays, enumStatus } from '../../../services/config';
import Select from '../../../components/Input/Select';
import Input from '../../../components/Input';

function UsersDetail(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usersDetailReq, usersDetailRes } = useSelector((state) => state.users);
  const { listGroupsReq, listGroupsRes, getGroupsUserRes, getGroupsUserReq, delGroupsUserReq } = useSelector((state) => state.groups);
  const params = useParams();
  const [isAssigned, setIsAssigned] = useState([]);

  useEffect(() => {
    if (params.id) {
      dispatch(usersAction.getUsersDetail(params.id));
    }
    dispatch(groupAction.listGroups());
    dispatch(groupAction.getGroupsByUser(params.id));
  }, []);

  const name = usersDetailRes && Object.keys(usersDetailRes).length > 0 && usersDetailRes.data.properties && Object.keys(usersDetailRes.data.properties).length > 0 ? usersDetailRes.data.properties.firstName : '';
  const lastName = usersDetailRes && Object.keys(usersDetailRes).length > 0 && usersDetailRes.data.properties && Object.keys(usersDetailRes.data.properties).length > 0 ? usersDetailRes.data.properties.lastName : '';
  const email = usersDetailRes && Object.keys(usersDetailRes).length > 0 && usersDetailRes.data.properties && Object.keys(usersDetailRes.data.properties).length > 0 ? usersDetailRes.data.properties.email : '';
  const state = usersDetailRes && Object.keys(usersDetailRes).length > 0 && usersDetailRes.data.properties && Object.keys(usersDetailRes.data.properties).length > 0 ? usersDetailRes.data.properties.state : '';

  const initialStateUser = [
    {
      id: 'first_name',
      initialValue: name,
      placeholder: 'John',
      validate: 'first_name',
      label: 'Nombre',
      type: 'text',
      disabled: true,
    },
    {
      id: 'last_name',
      initialValue: lastName,
      placeholder: 'Doe',
      label: 'Apellido',
      validate: 'last_name',
      type: 'text',
      disabled: true,
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
      disabled: false,
    },
  ];

  const handleChangeStatus = (values) => {
    const data = {
      state: values.state,
    };
    dispatch(usersAction.userChangeStatus(data, params.id));
  };

  const formConfig = useFormUserConfig(initialStateUser, handleChangeStatus);

  const arrGroups = listGroupsRes && Object.keys(listGroupsRes).length > 0 ? listGroupsRes.value.map((item, index) => {
    const { displayName } = item.properties;
    return {
      value: item.name,
      label: displayName,
    };
  }) : [];

  const handleCellClick = (groupName) => {
    navigate(`/developer/groups/${groupName}`);
  };

  const handleDeleteGroup = (groupId) => {
    const bodyParams = {
      userId: params.id,
      groupId,
    };
    dispatch(groupAction.deleteGroupOfUser(bodyParams));
  };

  const assignGroup = useFormik({
    initialValues: {
      groupId: '',
      userId: params.id,
    },
    validationSchema: Yup.object().shape({
      groupId: Yup.array(),
      userId: Yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      dispatch(groupAction.addGroupOfUser(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (assignGroup.values.groupId.length > 0) {
      setIsAssigned(assignGroup.values.groupId);
    }
    if (assignGroup.values.groupId.length === 0) {
      setIsAssigned([]);
    }
  }, [assignGroup.values.groupId]);

  const unSelectedGroups = arrGroups && Object.keys(arrGroups) && getGroupsUserRes && Object.keys(getGroupsUserRes).length > 0 ? compareArrays(arrGroups, getGroupsUserRes?.data?.value) : arrGroups;

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
        <div className='wrapper__title'>
          <Title text='Detalle de usuario' />
        </div>
      </div>
      <div>
        <Card className='card__wrapper'>
          {usersDetailReq ? (<Spinner title='Cargando...' styles={{ height: '500px' }} />) : (
            <div>
              <div className='fs__24 font-weight-bold text__primary'>Datos Personales</div>
              <form onSubmit={formConfig.handleSubmit} noValidate>
                <div className='row'>
                  {initialStateUser.map((field, index) => {
                    return field.type === 'select' ? (
                      <div className='flex-lg-6 flex-sm-12'>
                        <Select key={field.id} field={field} formik={formConfig} label={field.label} items={enumStatus} itemText='text' itemValue='value' />
                      </div>
                    ) : (
                      <div className='flex-lg-6 flex-sm-12'>
                        <Input key={field.id} field={field} formik={formConfig} />
                      </div>
                    );
                  })}
                </div>
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
              </form>
            </div>
          )}
        </Card>

        <div className='fs__30 font-weight-bold text__primary'>Asignar Grupo</div>
        <Card className='card__wrapper'>
          {listGroupsReq ? (<Spinner title='Cargando...' styles={{ height: '500px' }} />) : (
            <div>
              <form onSubmit={assignGroup.handleSubmit}>
                <div className='row align_items__center mt-4 justify_content__between'>
                  <div className='flex-lg-9 flex-sm-12'>
                    <Autocomplete
                      options={unSelectedGroups}
                      value={assignGroup.values.groupId}
                      onChange={(value) => assignGroup.setFieldValue('groupId', value)}
                      isMulti={true}
                      isCreatable={true}
                      usr={params.id}
                      className='wrapper__autocomplete'
                      placeholderText=''
                    />
                  </div>
                  <div className='flex-lg-3 flex-sm-12'>
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
          )}
        </Card>

        <div className='fs__30 font-weight-bold text__primary'>Grupos Asignados</div>
        <Card className='card__wrapper'>
          {getGroupsUserRes && Object.keys(getGroupsUserRes).length > 0 && getGroupsUserReq === false && delGroupsUserReq === false ? (
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
                      {getGroupsUserRes && Object.keys(getGroupsUserRes).length > 0 ? getGroupsUserRes.data.value.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                        >
                          <TableCell onClick={() => handleCellClick(row.name)}>
                            <p className='custom__table__cell__content custom__table__cell__content__link'>{row.properties.displayName}</p>
                          </TableCell>
                          <TableCell>
                            <p className='custom__table__cell__content custom__table__cell__content__description'>{row.properties.description}</p>
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleDeleteGroup(row.name)}>
                              <MdDelete color='#E4002B' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colspan={3}>Información no disponible</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          ) : (<Spinner styles={{ height: '500px' }} title='Cargando...' />)}
        </Card>
      </div>
    </Container>
  );
}

export default UsersDetail;
