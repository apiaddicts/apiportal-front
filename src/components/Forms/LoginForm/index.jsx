import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userConstants from '../../../redux/constants/userConstats';
import InputUI from '../../Input/InputUI/InputUI';
import Button from '../../Buttons/Button';
import styles from './login.module.scss';
import Alert from '../../Alert';

function Form({ classes, setShowForm, setShowResetForm, formik, fieldsLogin, setOpenForm, setIsOpen }) {

  const { signUpData, responseErrorLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!formik.values.remember) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }, [formik.values.remember]);

  const msjError = responseErrorLogin && Object.keys(responseErrorLogin).length > 0 ? responseErrorLogin?.error?.statusText : '';

  return (
    <form className='container' onSubmit={formik.handleSubmit} noValidate>
      <div className='row my-4'>
        <div className='flex-sm-12 flex-md-12 flex-lg-12'>
          {
            Object.keys(signUpData).length > 0 && Object.keys(responseErrorLogin).length === 0 ?
              (
                <Alert
                  key={Math.floor(Math.random() * 100) + 1}
                  css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                  alert_type='alert__success'
                  title='Revisa tu cuenta de correo'
                  msg='Para completar el registro, es necesario confirmar tu cuenta de correo'
                  display={true}
                />
              ) : Object.keys(signUpData).length === 0 && Object.keys(responseErrorLogin).length > 0 ? (
                <Alert
                  key={Math.floor(Math.random() * 100) + 1}
                  css_styles={{ custom_padding: 'p-4', custom_margin: 'mt-4' }}
                  alert_type='alert__danger'
                  title='Error al iniciar sesión'
                  msg={msjError}
                  display={true}
                />
              ) : (null)
          }
        </div>
      </div>
      <div className='row'>
        {
          fieldsLogin.filter((field) => field.type === 'email' || field.type === 'password')
            .map((field, index) => {
              return (
                <div key={index} className='flex-sm-12 flex-md-12 flex-lg-12 py-4'>
                  <InputUI
                    name={field.id}
                    id={field.id}
                    type={field.type}
                    label={field.placeholder}
                    touched={formik.touched[field.id]}
                    errors={formik.errors[field.id]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field.id]}
                  />
                </div>
              );
            })
        }
      </div>
      <div className={classes.login__footer}>
        <div className={styles.login__checkbox}>
          {
            fieldsLogin.filter((field) => field.type === 'checkbox')
              .map((field, index) => (
                <input
                  key={index}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  value={field.value}
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                />
              ))
          }
          {/* <input type='checkbox' id='remember_user' name='remember_user' /> */}
          <span className='ml-2'>Recordar datos</span>
        </div>
        <p
          onClick={() => {
            setShowResetForm(true);
            setShowForm(false);
            dispatch({
              type: userConstants.RESET_ALERT,
            });
          }}
          className='text__primary__title font-weight-bold caption cpointer'
        >
          ¿Olvidaste tu contraseña?
        </p>
      </div>
      <div className={styles.login__btn}>
        <Button
          styles='secundary-white'
          type='button'
          onClick={() => {
            setIsOpen(false);
            setOpenForm(true);
          }}
        >
          Registrarme
        </Button>
        <Button styles='tertiary' type='submit'>
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
};

export default Form;
