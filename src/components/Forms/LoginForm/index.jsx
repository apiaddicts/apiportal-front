import React from 'react';
import Input from '../../Input';
import Button from '../../Buttons/Button';
import styles from './login.module.scss';

function Form({ classes, setShowForm, setShowResetForm, formik, fieldsLogin }) {

  return (
    <form className='w-full px-8' onSubmit={formik.handleSubmit}>
      <div className='my-5 w-full'>
        {fieldsLogin.map((field) => (
          <Input key={field.id} field={field} formik={formik} />
        ))}
      </div>
      <div className={classes.login__footer}>
        <div className={styles.login__checkbox}>
          <input type='checkbox' />
          <span className='ml-2'>Recordar contraseña</span>
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
