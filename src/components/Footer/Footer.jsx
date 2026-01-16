/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import emailAction from '../../redux/actions/emailAction';
import 'yup-phone';
import Base from './Base';
import classes from './footer.module.scss';
import Icon from '../MdIcon/Icon';
/*import { ReactComponent as LogoAlt } from '../../static/img/logoAlt.svg';*/
import Button from '../Buttons/Button';
import InputUI from '../Input/InputUI/InputUI';
import TextAreaUI from '../Input/InputUI/TextAreaUI';
import config from '../../services/config';
import CustomIcon from '../MdIcon/CustomIcon';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';

function Footer({ isPrivate }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  if (pathname === '/soporte' || pathname === '/documentacion') return null;
  const dispatch = useDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha()
  const email = useSelector((state) => state.email);
  const img = '';
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;
  const socialLinks = [
    { link: '', icon: <FaFacebookF /> },
    { link: '', icon: <FaTwitter /> },
    { link: '', icon: <FaYoutube /> },
    { link: '', icon: <FaInstagram /> },
    { link: '', icon: <FaLinkedinIn /> },
  ];
  const [contactForm, setContactForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [displaySubmit, setDisplaySubmit] = useState(true);

  // console.log(config);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      sendMailTerms: false,
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Campo requerido').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'No se permiten caracteres especiales o númericos').max(50, 'Se ha excedido el número de caracteres permitidos'),
      lastname: Yup.string().required('Campo requerido').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'No se permiten caracteres especiales o númericos').max(50, 'Se ha excedido el número de caracteres permitidos'),
      email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
      //phone: Yup.string().phone('MX', false, 'Debe ingresar un número telefónico válido'),
      // topic: Yup.string().required('Campo requerido'),
      subject: Yup.string().required('Campo requerido').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'No se permiten caracteres especiales o númericos').max(70, 'Se ha excedido el número de caracteres permitidos'),
      message: Yup.string().required('Campo requerido'),
      //sendMailTerms: Yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
    }),
    onSubmit: async (values) => {
      if (!executeRecaptcha) {
        console.warn('Recaptcha not yet available');
        return;
      }

      const recaptchaToken = await executeRecaptcha('contact_form');
      if (!recaptchaToken) {
       
        return;
      }

      
      const dataWithToken = {
        ...values,
        recaptchaToken,
      };

      setDisplaySubmit(false);
      dispatch(emailAction.sendContactEmail(dataWithToken));
    },
  });

  useEffect(() => {
    if (email?.contactEmailError?.ok === false) {
      setError(true);
      setTimeout(() => { setError(false); }, 2000);
      setDisplaySubmit(true);
    } else if (email?.contactEmail?.ok) {
      setSuccess(true);
      setTimeout(() => { setSuccess(false); }, 2000);
      setDisplaySubmit(true);
    }
  }, [email]);

  return (
    <div>
      {!isPrivate && (
        <Base img={img}>
          <div className={`container ${classes.footer__container}`}>
            <h1 className='h2 text__white mb-3'>{t('Footer.contactUs')}</h1>
            <p style={{ fontWeight: 400 }} className='h5 text__white mb-10'>{t('Footer.leaveMessage')}</p>
          </div>
          <div className={classes.button__fab}>
            <button type='button' onClick={() => { setContactForm(!contactForm); formik.resetForm(); }}>
              {contactForm ? <span style={{ fontSize: 25 }}>{t('Footer.interested')}</span> : <span style={{ fontSize: 25 }}>{t('Footer.interested')}</span>}
            </button>
          </div>
        </Base>
      )}

      {contactForm && (
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className={classes.footer__section}>
            <div className={`container ${classes.footer__section__contact}`}>
              <div className='mb-5'>
                <div className='row justify-center'>
                  <div className='container'>
                    {
                      success && (
                        <div className='row justify-center'>
                          <div className='flex-sm-12 flex-md-8 flex-lg-8 pb-5'>
                            <Alert severity='success' className='mb-5'>Datos enviados correctamente.</Alert>
                          </div>
                        </div>
                      )
                    }

                    {
                      error && (
                        <div className='row justify-center'>
                          <div className='flex-sm-12 flex-md-8 flex-lg-8 pb-5'>
                            <Alert severity='error' className='mb-5'>Ocurrio un error, vuelve a intentarlo.</Alert>
                          </div>
                        </div>
                      )
                    }
                    <div className='row justify-center'>
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
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
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
                        <InputUI
                          name='lastname'
                          id='lastname'
                          type='text'
                          label='Apellidos*'
                          touched={formik.touched.lastname}
                          errors={formik.errors.lastname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastname}
                        />
                      </div>
                    </div>
                    <div className='row justify-center'>
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
                        <InputUI
                          name='email'
                          id='email'
                          type='email'
                          label='Correo electrónico*'
                          touched={formik.touched.email}
                          errors={formik.errors.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                      </div>
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
                        <InputUI
                          name='phone'
                          id='phone'
                          type='tel'
                          label='Teléfono de contacto'
                          errors={formik.errors.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                        />
                      </div>
                    </div>
                    <div className='row justify-center'>
                      <div className='flex-sm-12 flex-md-8 flex-lg-8 pb-10'>
                        <InputUI
                          name='subject'
                          id='subject'
                          type='text'
                          label='Asunto*'
                          touched={formik.touched.subject}
                          errors={formik.errors.subject}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.subject}
                        />
                      </div>
                    </div>
                    <div className='row justify-center'>
                      <div className='flex-sm-12 flex-md-8 flex-lg-8 pb-5'>
                        <TextAreaUI
                          name='message'
                          id='message'
                          label='Mensaje'
                          touched={formik.touched.message}
                          errors={formik.errors.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.message}
                          counter={50}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className='row mb-5 px-5'>
                <div className='container'>
                  <div className='row justify-center'>
                    <div className={`flex-sm-12 flex-md-8 flex-sm-8 ${classes.footer__section__contact__terms}`}>
                      <input
                        type='checkbox'
                        id='sendMailTerms'
                        name='sendMailTerms'
                        onChange={formik.handleChange}
                      />
                      <span className={`ml-2 ${formik.errors.sendMailTerms ? 'text__error' : ''}`}>
                        {' '}
                        Acepto recibir correos de acuerdo con los siguientes
                        {' '}
                        <a target='blank' href={config.termsPath}>términos y condiciones.</a>
                        {' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>*/}
              <div className='row mb-5 mt-10 justify-center'>
                <div className='flex-md-4 flex-lg-3 flex-sm-12'>
                  {
                    displaySubmit &&
                    (
                      <Button styles={formik.isValid ? 'tertiary' : 'disabled'} disabled={!formik.isValid} type='submit'>
                        Enviar
                      </Button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      <div
        className={classes.footer}
      >
        <div
          className={`container ${classes.footer__end}`}
        >
          <div className={classes.logo}>
            <CustomIcon name='logowhite' />
          </div>
          <div className={classes.email}>
            <p className='body-1 font-weight-bold text__white'>
              {t('Footer.email')}
            </p>
            <p className='body-1 font-weight-bold text__white'>{config.contact}</p>
          </div>
          <div className={classes.policies}>
            <p className='body-1 font-weight-bold'>
              <a href={config.privacyPolicyPath} target='_blank' className='text__white'>{t('Footer.privacyPolicy')}</a>
            </p>
          </div>
          <div className={classes.policies}>
            <p className='body-1 font-weight-bold'>
              <a href={config.cookiesPolicyPath} target='_blank' className='text__white'>{t('Footer.cookiesPolicy')}</a>
            </p>
          </div>
        </div>
        <div className={`container ${classes.footer__social}`}>
          <div className={classes.footer__social__copyright}>
            <p className='caption text-uppercase text__white mb-3'>
              &copy; <span>{year}</span>{' '}
              {config.company && `${config.company}. ` }
              {t('Footer.allRightsReserved')}
            </p>
          </div>
          <div
            className={classes.footer__social__icons}
            style={{
              display: 'flex',
              gap: '16px',
              fontSize: '20px',
            }}
          >
            {
              socialLinks.map((socialLink, index) => (
                <a href={socialLink.link} key={index} target='_blank' rel='noreferrer'>
                  {socialLink.icon}
                </a>
              ))
            }
          </div>
        </div>
      </div>

    </div>
  );
}

export default Footer;
