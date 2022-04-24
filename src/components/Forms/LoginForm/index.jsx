import React from 'react';
import Input from '../../Input';
import Button from '../../Buttons/Button';

function Form({ classes, setShowForm, setShowResetForm, formik, fieldsLogin }) {

  return (
    <form className='w-full px-8' onSubmit={formik.handleSubmit}>
      <div className='my-5 w-full'>
        {fieldsLogin.map((field) => (
          <Input key={field.id} field={field} formik={formik} />
        ))}
      </div>
      <div className={classes.login__footer}>
        <div className={classes.login__checkbox}>
          <input type='checkbox' />
          <span>Recordar contraseña</span>
        </div>
        <p
          onClick={() => {
            setShowResetForm(true);
            setShowForm(false);
          }}
          className={classes.login__links}
        >
          ¿Olvidaste tu contraseña?
        </p>
      </div>
      <div className={classes.login__button}>
        <Button styles='secundary' type='submit'>
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
};

export default Form;
