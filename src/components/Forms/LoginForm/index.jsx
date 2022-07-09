import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userConstants from '../../../redux/constants/userConstats';
import Input from '../../Input';
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

  return (
    <form className='w-full px-8' onSubmit={formik.handleSubmit} noValidate>
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
              msg={['La información ingresada no es correcta, intenta cambiar la contraseña, si no la recuerdas puedes ir a ', <b key={Math.floor(Math.random() * 100) + 1}>olvidaste tu contraseña</b>]}
              display={true}
            />
          ) : (null)
      }
      <div className='my-5 w-full'>
        {
          fieldsLogin.filter((field) => field.type === 'email' || field.type === 'password')
            .map((field, index) => (
              <Input key={index} field={field} formik={formik} />
            ))
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
          className='text__secondary font-weight-bold caption cpointer'
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
        <Button styles='primary-blue' type='submit'>
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
};

export default Form;
