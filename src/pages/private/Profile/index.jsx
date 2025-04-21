/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { updateUser } from '../../../redux/actions/userAction';
// import { listUserSubscriptions } from '../../../redux/actions/subscriptionsAction';
import useFormUserConfig from '../../../hooks/useFormUser';
import Input from '../../../components/Input';
import Button from '../../../components/Buttons/Button';
import Title from '../../../components/Title';
import Suscriptions from '../../../components/Suscriptions';
import SuscriptionsVertical from '../../../components/SuscriptionsVertical';
import RestorePassword from '../../../components/RestorePasswordForm';
import classes from './profile.module.scss';

function Profile() {
  const dispatch = useDispatch();
  const { user, loadingUser, id, token } = useSelector((state) => state.user);
  const [displayRestorePassword, setDisplayRestorePassword] = useState(false);
  const { suscripcionsUser } = useSelector((state) => state.suscripcions);

  useEffect(() => {
    // if (suscripcionsUser && Object.keys(user).length > 0 && Object.keys(suscripcionsUser).length === 0) {
    //   dispatch(listUserSubscriptions(user.name));
    // }
  }, [suscripcionsUser]);

  const handleSubmit = async (values) => {
    const data = {
      properties: {
        firstName: values.first_name,
        lastName: values.last_name,
      },
    };
    const tokens = {
      id,
      token,
    };
    dispatch(updateUser(data, user.name, tokens));
  };
  const name = user && Object.keys(user).length > 0 ? user.firstName : '';
  const lastName = user && Object.keys(user).length > 0 ? user.lastName : '';
  const email = user && Object.keys(user).length > 0 ? user.email : '';

  const labelsUser = [
    {
      id: 'first_name',
      initialValue: name,
      placeholder: 'John',
      label: 'Nombre',
      validate: 'first_name',
      required: true,
      type: 'text',
    },
    {
      id: 'last_name',
      initialValue: lastName,
      placeholder: 'Doe',
      label: 'Apellido',
      validate: 'last_name',
      required: true,
      type: 'text',
    },
    {
      id: 'email',
      initialValue: email,
      placeholder: 'youremail@domain.com',
      label: 'Correo electrónico',
      validate: 'email',
      required: true,
      type: 'email',
      disabled: true,
    },
  ];

  const formConfig = useFormUserConfig(labelsUser, handleSubmit);

  const toggleForm = () => {
    setDisplayRestorePassword(!displayRestorePassword);
  };

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
      <div className={classes.main__admin}>
        {user && Object.keys(user).length > 0 && loadingUser === false ? (
          <div className={classes.admin}>
            <div className='w-full mb-5'>
              <Title text='Mi perfil' />
            </div>
            <div className={classes.admin__form}>
              <form onSubmit={formConfig.handleSubmit} noValidate>
                <div className={classes.admin__form__container}>
                  <div className={classes.admin__form__container__header}>
                    <div className='font-fs-joey fs__36 font-weight-bold text__dark__primary'>Datos personales</div>
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
                        className='fs__16 text__dark__primary ls_05 font-weight-bold ml-3 mb-2 cpointer'
                        onClick={() => setDisplayRestorePassword(!displayRestorePassword)}
                      >
                        Restablecer contraseña
                      </div>
                    </div>
                    <div className='flex-lg-3 flex-sm-12 display_flex align_items__bottom justify_content__end ml-auto mb-2'>
                      <Button
                        type='submit'
                        styles='tertiary'
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              <div className={`${classes.admin__form__container} margin_top`}>
                <RestorePassword userEmail={user?.properties?.email} display={displayRestorePassword} toggleForm={toggleForm} />
              </div>
            </div>
          </div>
        ) : (null)}

      </div>
      <div className={classes.main__suscription}>
        <div className={classes.wrapper_subscriptions__wide__display}>
          <Suscriptions user={user} suscriptions={suscripcionsUser} title='Suscripciones' />
        </div>
        <div className={classes.wrapper_subscriptions__small__display}>
          <SuscriptionsVertical user={user} suscriptions={suscripcionsUser} title='Suscripciones' />
        </div>
      </div>
    </Container>
  );
}

export default Profile;
