// import { Container } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import Alert from '@mui/material/Alert';
import Button from '../components/Buttons/Button';
import classes from '../styles/pages/resetpassword.module.scss';
import InputUI from '../components/Input/InputUI/InputUI';
import SuraLogo from '../static/img/sura_logo_alt.svg';
import CustomFooter from '../components/common/CustomFooter/CustomFooter';

function ResetPassword(props) {

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      //Agregar evento para cambio de contraseña
      console.log(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = 'Nueva contraseña es campo requerido';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirmar contraseña es campo requerido';
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'No coinciden las contraseñas';
      }
      return errors;
    },
  });

  return (
    <div>
      <div className={classes.navbar}>
        <div className={classes.navbar__content}>
          <img src={SuraLogo} alt='' />
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.wrapper__content}>
          <div className={classes.wrapper__content__text}>
            <div className='container'>
              <div className='row'>
                <div className='flex-sm-12 flex-md-12'>
                  <h1>Ingresa tu nueva contraseña</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.wrapper__content__text}>
            <div className='container'>
              <div className='row'>
                <div className='flex-sm-12 flex-md-12'>
                  <p>Tu nueva contraseña debe ser diferente a la anterior</p>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='flex-sm-12 flex-md-12'>
                {formik.errors.password || formik.errors.confirmPassword ? (
                  <Alert severity='error'>
                    <p>{formik.errors.password}</p>
                    <p>{formik.errors.confirmPassword}</p>
                  </Alert>
                ) : null }
              </div>
            </div>
          </div>
          <div className='container'>
            <form onSubmit={formik.handleSubmit}>
              <div className='row justify-center'>
                <div className='flex-sm-12 flex-md-12 py-10'>
                  <InputUI
                    name='password'
                    id='password'
                    label='Nueva contraseña*'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required={true}
                  />
                </div>
                <div className='flex-sm-12 flex-md-12 pb-10'>
                  <InputUI
                    name='confirmPassword'
                    label='Confirmar contraseña*'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    required={true}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='flex-sm-12 flex-md-12'>
                  <Button styles='primary-blue' type='submit'>
                    Restablecer contraseña
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}

ResetPassword.propTypes = {};

export default ResetPassword;
