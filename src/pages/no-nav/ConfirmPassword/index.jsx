// import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '../../../components/Buttons/Button';
import InputUI from '../../../components/Input/InputUI/InputUI';
import CustomFooter from '../../../components/common/CustomFooter/CustomFooter';
import { resetPasswordWithTicket } from '../../../redux/actions/userAction';
import SuraLogo from '../../../static/img/sura_logo_alt.svg';
import classes from './confirm-password.module.scss';

function ResetPassword(props) {

  const { responseResetPwd, responseResetPwdError } = useSelector((state) => state.user);
  const [hasErrors, setHasErrors] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const queryParams = {
    id: searchParams.get('userid'),
    ticketid: searchParams.get('ticketid'),
    ticket: searchParams.get('ticket'),
  };

  useEffect(() => {
    if (Object.keys(responseResetPwdError).length > 0) {
      setHasErrors(true);
    }
  }, [responseResetPwdError]);

  useEffect(() => {
    if (Object.keys(responseResetPwd).length > 0) {
      setHasSuccess(true);
    }
  }, [responseResetPwd]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      const data = {
        properties: {
          password: values.password,
        },
      };
      dispatch(resetPasswordWithTicket(queryParams, data));
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
                  {
                    hasErrors &&
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <Alert severity='error'>
                      <p>Es posible que el enlace para actualizar tu contraseña haya expirado o tu cuenta de correo aún no se encuentre confirmada </p>
                    </Alert>
                  }
                  {
                    hasSuccess &&
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <Alert severity='success'>
                      Tu contraseña ha sido cambiada
                    </Alert>
                  }
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
