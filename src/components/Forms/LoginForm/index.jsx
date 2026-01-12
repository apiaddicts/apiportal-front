import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import userConstants from '../../../redux/constants/userConstats';
import InputUI from '../../Input/InputUI/InputUI';
import Button from '../../Buttons/Button';
import styles from './login.module.scss';
import Alert from '../../Alert';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { sendEmailToConfirmEmail } from '../../../redux/actions/userAction';


function Form({ classes, setShowForm, setShowResetForm, formik, fieldsLogin, setOpenForm, setIsOpen }) {
  const { t } = useTranslation();
  const { signUpData, responseErrorLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha(); // ✅ Hook de reCAPTCHA

  useEffect(() => {
    if (!formik.values.remember) {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  }, [formik.values.remember]);

  const msjError =
    responseErrorLogin && Object.keys(responseErrorLogin).length > 0
      ? responseErrorLogin?.error?.statusText
      : '';

  const handleSubmitWithRecaptcha = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not ready');
      return;
    }

    const token = await executeRecaptcha('login');
    if (!token) {
      console.error(' No se pudo generar el token reCAPTCHA');
      return;
    }

    const valuesWithToken = {
      ...formik.values,
      recaptchaToken: token,
    };

    
    formik.setFieldValue('recaptchaToken', token);
    formik.handleSubmit(); 
  };

  return (
    <form className='container' onSubmit={handleSubmitWithRecaptcha} noValidate>
      <div className='row my-4'>
        <div className='flex-sm-12 flex-md-12 flex-lg-12'>
          {
            Object.keys(signUpData).length > 0 && Object.keys(responseErrorLogin).length === 0 ?
              (
                <Alert
                  key={Math.floor(Math.random() * 100) + 1}
                  css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                  alert_type='alert__success'
                  title={t('LoginForm.checkEmailTitle')}
                  msg={t('LoginForm.checkEmailMessage')}
                  display={true}
                  onResend={ () => {
                    dispatch(sendEmailToConfirmEmail(registerData,'Mulesoft'));
                    }
                  }
                />
              ) : Object.keys(signUpData).length === 0 && Object.keys(responseErrorLogin).length > 0 ? (
                <Alert
                  key={Math.floor(Math.random() * 100) + 1}
                  css_styles={{ custom_padding: 'p-4', custom_margin: 'mt-4' }}
                  alert_type='alert__danger'
                  title={t('LoginForm.errorLoginTitle')}
                  msg={msjError}
                  display={true}
                />
              ) : (null)
          }
        </div>
      </div>

      <div className='row'>
        {
          fieldsLogin.filter((field) => field.type === 'username' || field.type === 'password')
            .map((field, index) => {
              return (
                <div key={index} className='flex-sm-12 flex-md-12 flex-lg-12 py-4'>
                  <InputUI
                    name={field.id}
                    id={field.id}
                    type={field.type}
                    label={t(`LoginForm.${field.id}`)}
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
          <span className='ml-2 font-weight-bold caption cpointer'>{t('LoginForm.rememberData')}</span>
        </div>

        <p
          onClick={() => {
            setShowResetForm(true);
            setShowForm(false);
            dispatch({ type: userConstants.RESET_ALERT });
          }}
          className='text__primary__title font-weight-bold caption cpointer'
        >
          {t('LoginForm.forgotPassword')}
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
          {t('LoginForm.registerButton')}
        </Button>
        <Button styles='tertiary' type='submit'>
          {t('LoginForm.loginButton')}
        </Button>
      </div>
    </form>
  );
}

export default Form;
