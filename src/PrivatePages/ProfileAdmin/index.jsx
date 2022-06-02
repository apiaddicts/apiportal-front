/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';

import Input from '../../components/Input';
import useFormUserConfig from '../../hooks/useFormUser';
import classes from './style.module.scss';
import Button from '../../components/Buttons/Button';
import Title from '../../components/Title/Title';
import { updateUser } from '../../redux/actions/userAction';
import Suscriptions from './containers/Suscriptions';
import RestorePassword from './containers/RestorePassword';

function Admin() {
  const { user, loadingUser } = useSelector((state) => state.user);
  const [displayRestorePassword, setDisplayRestorePassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const data = {
      properties: {
        firstName: values.first_name,
        lastName: values.last_name,
      },
    };
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
    <div className={`w-full ${classes.margin_left}`}>
      <Container fixed className='my-10 py-10'>
        <div className={classes.main__admin}>
          {user && Object.keys(user).length > 0 && loadingUser === false ? (
            <div className={classes.admin}>
              <div className='w-full my-9'>
                <Title text='Mi perfil' />
              </div>
              <div className={classes.admin__form}>
                <form onSubmit={formConfig.handleSubmit}>
                  <div className={classes.admin__form__container}>
                    <div className={classes.admin__form__container__header}>
                      <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Datos personales</div>
                      <div className='fs__16 text__gray__gray_darken ls_05'>
                        <span className='text-uppercase font-weight-semi-bold'>Fecha de registro:</span>
                        <span className='fs'>12/05/2022</span>
                      </div>
                    </div>
                    <div className='row'>
                      {labelsUser.map((field) => (
                        <div className='flex-lg-6 flex-sm-12'>
                          <Input key={field.id} field={field} formik={formConfig} />
                        </div>
                      ))}
                    </div>
                    <div className='row align_items__center mt-4 justify_content__between'>
                      <div className='flex-lg-6 flex-sm-12'>
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                        <div
                          className='fs__16 text__gray__gray_darken ls_05 text-uppercase font-weight-bold ml-3 cpointer'
                          onClick={() => setDisplayRestorePassword(!displayRestorePassword)}
                        >
                          Restablecer password
                        </div>
                      </div>
                      {
                        !displayRestorePassword && (
                          <div className='flex-lg-3 flex-sm-12'>
                            <Button
                              type='submit'
                              styles='primary'
                            >
                              Guardar
                            </Button>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </form>
                <div className={classes.admin__form__container}>
                  <RestorePassword userEmail={user?.properties?.email} display={displayRestorePassword} />
                </div>
              </div>
            </div>
          ) : (null)}

        </div>
      </Container>
      <Suscriptions user={user} />
    </div>
  );
}

export default Admin;
