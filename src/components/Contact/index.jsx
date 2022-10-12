import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@mui/material';
import { sendContactMail } from '../../redux/actions/mailAction';
import classes from './contact.module.scss';
import Button from '../Buttons/Button';
import icons from '../../static/icons-sura';
import InputUI from '../Input/InputUI/InputUI';

function Contact({ css_styles, pathname }) {

  const dispatch = useDispatch();
  const mail = useSelector((state) => state.mail);
  const { display_contact, display_detail_description, border_radius } = css_styles;
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
      setSuccess(false);
      dispatch(sendContactMail(values));
      setSuccess(true);
    },
  });

  useEffect(() => {
    if (mail?.mailContactError?.ok === false) {
      setError(true);
      setTimeout(() => { setError(false); }, 2000);
    } else if (mail?.mailContact?.ok) {
      setSuccess(true);
      setTimeout(() => { setSuccess(false); }, 2000);
    }
  }, [mail]);

  return (
    <div className={`${classes.contact} ${display_contact} ${classes[border_radius]}`}>
      <div className={pathname !== '/blog' ? classes.contact__container__alternative : classes.contact__container}>
        <div className={pathname !== '/blog' ? classes.contact__alternative__header : classes.contact__header}>
          <div className={classes.contact__alternative__header_icons}>
            <div className={classes.contact__header__icon}>
              {icons('email')}
            </div>
            <p className={pathname !== '/blog' ? classes.contact__alternative__title : classes.contact__header__title}>Sigamos conectados</p>
          </div>
          <p className={`pt-5 pb-2 pl-2 d-none text__primary fs__22 m-0 ${display_detail_description} d-xs-none`}>¡Entérate de lo último! Escoge una o varias capacidades y sé el primero en enterarte.</p>
        </div>
        <div className={pathname !== '/blog' ? classes.contact__header__title__alternative : classes.contact__header__title}>
          <div className={pathname !== '/blog' ? classes.contact__alternative__description : classes.contact__description}>
            <p className='pt-5 pb-2'>¡Entérate de lo último! </p>
          </div>
          {
            error && (
              <Alert severity='error' className='mb-5'>Ups!! Ocurrio un error, vuelve a intentarlo</Alert>
            )
          }
          {
            success ? (<Alert severity='success' className='mb-5'>Datos enviados correctamente</Alert>) :
              (
                <div className={pathname !== '/blog' ? classes.contact__alternative__description : classes.contact__description}>
                  <p className=''> Escoge una o varias capacidades y sé el primero en enterarte.</p>
                </div>
              )
          }
        </div>
        <div className={pathname !== '/blog' ? classes.contact__container__alternative__form : classes.contact__container__form}>
          <form onSubmit={formik.handleSubmit} noValidate className={pathname !== '/blog' ? classes.contact__alternative__form : classes.contact__form}>
            {/* {fieldsContact.map((field) => (
              <Input styleInput={classes.contact__form__new} key={field.id} field={field} formik={formConfig} />
            ))} */}
            <div className='container'>
              <div className='row'>
                <div className={pathname === '/blog' ? 'flex-sm-12 flex-md-12 pb-8 mt-2' : 'flex-sm-12 flex-md-6 flex-lg-6'}>
                  <InputUI
                    name='name'
                    id='name'
                    type='text'
                    label='Nombre*'
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
                    label='E-mail*'
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
              <Button styles='primary-blue' type='submit'>
                SUSCRÍBETE
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
