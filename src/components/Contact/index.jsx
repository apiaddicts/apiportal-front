import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@mui/material';
import classes from './contact.module.scss';
import Button from '../Buttons/Button';
import icons from '../../static/icons';
import InputUI from '../Input/InputUI/InputUI';

function Contact({ css_styles, pathname }) {
  const email = useSelector((state) => state.email);
  const { display_contact, display_detail_description, border_radius, override_margin_right } = css_styles;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Campo requerido').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'No se permiten caracteres especiales o númericos').max(50, 'Se ha excedido el número de caracteres permitidos'),
      email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
    }),
    onSubmit: (values) => {
      setError(false);
      setSuccess(true);
    },
  });

  useEffect(() => {
    if (email?.newsletterEmailError?.ok === false) {
      setError(true);
      setTimeout(() => { setError(false); }, 2000);
    } else if (email?.newsletterEmail?.ok) {
      setSuccess(true);
      setTimeout(() => { setSuccess(false); }, 2000);
    }
  }, [email]);

  const translations = {
    es: {
      subscribe: 'SUSCRÍBETE',
      name: 'Nombre*',
      email: 'E-mail*',
      error: 'Ups!! Ocurrio un error, vuelve a intentarlo',
      success: 'Datos enviados correctamente',
      description: 'Escoge una o varias capacidades y sé el primero en enterarte.',
      connected: '¡Sigamos conectados!'
    },
    en: {
      subscribe: 'SUBSCRIBE',
      name: 'Name*',
      email: 'E-mail*',
      error: 'Oops!! An error occurred, please try again',
      success: 'Data sent successfully',
      description: 'Choose one or more capabilities and be the first to know.',
      connected: 'Let’s stay connected!'
    }
  };

  const locale = 'es'; // Change this dynamically based on user preference

  return (
    <div className={`${classes.contact} ${display_contact} ${classes[border_radius]}`}>
      <div className={pathname !== '/blog' ? classes.contact__container__alternative : classes.contact__container}>
        <div className={pathname !== '/blog' ? classes.contact__alternative__header : classes.contact__header}>
          <div className={classes.contact__alternative__header_icons}>
            <div className={classes.contact__header__icon}>
              {icons('email')}
            </div>
            <p className={pathname !== '/blog' ? classes.contact__alternative__title : classes.contact__header__title}>¡Entérate de lo último!</p>
          </div>
          <p className={`pt-5 pb-2 pl-2 d-none text__white text-center fs__22 m-0 ${display_detail_description} d-xs-none`}>¡Sigamos conectados! Escoge una o varias capacidades y sé el primero en enterarte.</p>
        </div>
        <div className={pathname !== '/blog' ? classes.contact__header__title__alternative : classes.contact__header__title}>
          <div className={pathname !== '/blog' ? classes.contact__alternative__description : classes.contact__description}>
            <p className='pt-5 pb-2'>¡Sigamos conectados! </p>
          </div>
          {
            error && (
              <Alert severity='error' className='mb-5'>{translations[locale].error}</Alert>
            )
          }
          {
            success ? (<Alert severity='success' className='mb-5'>{translations[locale].success}</Alert>) :
              (
                <div className={pathname !== '/blog' ? classes.contact__alternative__description : classes.contact__description}>
                  <p className=''> {translations[locale].description}</p>
                </div>
              )
          }
        </div>
        <div className={pathname !== '/blog' ? classes.contact__container__alternative__form : classes.contact__container__form}>
          <form onSubmit={formik.handleSubmit} noValidate className={pathname !== '/blog' ? classes.contact__alternative__form : classes.contact__form}>
            {/* {fieldsContact.map((field) => (
              <Input styleInput={classes.contact__form__new} key={field.id} field={field} formik={formConfig} />
            ))} */}
            <div className={`container ${classes.container_padding} ${override_margin_right}`}>
              <div className='row'>
                <div className={pathname === '/blog' ? 'flex-sm-12 flex-md-12 pb-8 mt-2' : 'flex-sm-12 flex-md-6 flex-lg-6'}>
                  <InputUI
                    name='name'
                    id='name'
                    type='text'
                    label={translations[locale].name}
                    touched={formik.touched.name}
                    errors={formik.errors.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                <div className={pathname === '/blog' ? 'flex-sm-12 flex-md-12' : 'flex-sm-12 flex-md-6 flex-lg-6'}>
                  <InputUI
                    name='email'
                    id='email'
                    type='email'
                    label={translations[locale].email}
                    touched={formik.touched.email}
                    errors={formik.errors.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
              </div>
            </div>
            <div className={classes.contact__form__button}>
              <Button styles='tertiary' type='submit'>
                {translations[locale].subscribe}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Contact.defaultProps = {
  css_styles: '',
};

export default Contact;
