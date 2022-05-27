/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';

import TextField from '../../components/common/InputMUI';
import useFormUserConfig from '../../hooks/useFormUser';
import classes from './style.module.scss';
import TypographyUI from '../../components/common/TypographyMUI';
import Button from '../../components/Buttons/Button';
import Title from '../../components/Title/Title';
import { updateUser } from '../../redux/actions/userAction';
import Suscriptions from './containers/Suscriptions';

function Admin() {
  const { user, loadingUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const data = {
      properties: {
        firstName: values.first_name,
        lastName: values.last_name,
      },
    };
    console.log('data', data);
    dispatch(updateUser(data));
  };

  const name = user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? user.properties.firstName : '';
  const lastName = user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? user.properties.lastName : '';
  const email = user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? user.properties.email : '';

  const labelsUser = [
    {
      id: 'first_name',
      initialValue: name,
      placeholder: 'John',
      label: 'First name',
      validate: 'first_name',
      required: true,
      type: 'text',
    },
    {
      id: 'last_name',
      initialValue: lastName,
      placeholder: 'Doe',
      label: 'Last name',
      validate: 'last_name',
      required: true,
      type: 'text',
    },
    {
      id: 'email',
      initialValue: email,
      placeholder: 'youremail@domain.com',
      label: 'Email',
      validate: 'email',
      required: true,
      type: 'email',
      disabled: true,
    },
  ];

  const formConfig = useFormUserConfig(labelsUser, handleSubmit);
  return (
    <div className='w-full'>
      <Container fixed className='my-10 py-10'>
        <div className={classes.main__admin}>
          {user && Object.keys(user).length > 0 && loadingUser === false ? (
            <div className={classes.admin}>
              <div className='w-full my-9'>
                <Title text='Mi perfil' />
              </div>
              <form onSubmit={formConfig.handleSubmit} className={classes.admin__form}>
                <div className={classes.admin__form__container}>
                  <div className={classes.admin__form__container__header}>
                    <TypographyUI title='Datos personales' />
                    <div className='fs__16 text__gray__gray_darken ls_05'>
                      <span className='text-uppercase font-weight-semi-bold'>Fecha de registro:</span>
                      <span className='fs'>12/05/2022</span>
                    </div>
                  </div>
                  <div className='row'>
                    {labelsUser.map((field, i) => (
                      <div className='flex-lg-6 flex-sm-12'>
                        <TextField key={i} field={field} formik={formConfig} />
                      </div>
                    ))}
                  </div>
                  <div className='row align_items__center mt-4 justify_content__between'>
                    <div className='flex-lg-6 flex-sm-12'>
                      <div className='fs__16 text__primary ls_05 text-uppercase font-weight-bold'>Restablecer password</div>
                    </div>
                    <div className='flex-lg-3 flex-sm-12'>
                      <Button type='submit' styles='primary'>
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (null)}

        </div>
      </Container>
      <Suscriptions />
    </div>
  );
}

export default Admin;
