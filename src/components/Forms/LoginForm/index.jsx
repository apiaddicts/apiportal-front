import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../Buttons/Button';
import Input from '../../Input';

function Form({ handleSubmit, classes, setShowForm, setShowResetForm }) {

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('El email no es válido')
      .required('El email es obligatorio'),
    password: Yup.string()
      .required('La contraseña es obligatoria'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form className='w-full px-8' onSubmit={formik.handleSubmit}>
      <div className='my-5 w-full'>
        <Input
          placeholder='Email'
          type='email'
          name='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && (
          <p className={classes.error}>{formik.errors.email}</p>
        )}
      </div>
      <div className='my-5 w-full'>
        <Input
          placeholder='Password'
          type='password'
          name='password'
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && <p className={classes.error}>{formik.errors.password}</p>}
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
          className={classes.login__text}
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
