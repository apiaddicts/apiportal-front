import React from 'react';
import Input from '../../Input';
import Button from '../../Buttons/Button';
import styles from './login.module.scss';
import Alert from '../../Alert';

function Form({ classes, setShowForm, setShowResetForm, formik, fieldsLogin }) {

  return (
    <form className='w-full px-8' onSubmit={formik.handleSubmit}>
      <Alert
        key={Math.floor(Math.random() * 100) + 1}
        css_styles={{ custom_padding: 'p-4', custom_margin: 'mt-4' }}
        alert_type='alert__danger'
        title='Error on login'
        msg={['La información ingresada no es correcta, intenta cambiar la contraseña, si no la recuerdas puedes ir a', <a href='#'>olvidaste tu contraseña</a>]}
      />
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
          }}
          className='text__secondary font-weight-bold caption cpointer'
        >
          ¿Olvidaste tu contraseña?
        </p>
      </div>
      <div className={styles.login__btn}>
        <div className={styles.login__btn__button}>
          <Button styles='primary-blue' type='submit'>
            Iniciar sesión
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
