/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Alert } from '@mui/material';
import { RiInstagramFill } from 'react-icons/ri';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sendConversationMail } from '../../redux/actions/mailAction';
import 'yup-phone';
import Base from './Base';
import classes from './footer.module.scss';
import Icon from '../MdIcon/Icon';
import { ReactComponent as LogoAlt } from '../../static/img/logoAlt.svg';
import Button from '../Buttons/Button';
import InputUI from '../Input/InputUI/InputUI';
import TextAreaUI from '../Input/InputUI/TextAreaUI';
import SelectUI from '../Input/InputUI/SelectUI';
import config from '../../services/config';
import CustomIcon from '../MdIcon/CustomIcon';

function Footer({ isPrivate }) {

  const dispatch = useDispatch();
  const mail = useSelector((state) => state.mail);
  const img = '';
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;
  const socialLinks = [
    { link: 'https://apiquality.es', icon: <FaFacebookF /> },
    { link: 'https://apiquality.es', icon: <FaTwitter /> },
    { link: 'https://apiquality.es', icon: <FaYoutube /> },
    { link: 'https://apiquality.es', icon: <RiInstagramFill /> },
  ];
  const [contactForm, setContactForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [displaySubmit, setDisplaySubmit] = useState(true);

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
      phone: Yup.string().phone('MX', true, 'Debe ingresar un número telefónico válido').required('Campo requerido'),
      // topic: Yup.string().required('Campo requerido'),
      subject: Yup.string().required('Campo requerido').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'No se permiten caracteres especiales o númericos').max(70, 'Se ha excedido el número de caracteres permitidos'),
      message: Yup.string().required('Campo requerido'),
      sendMailTerms: Yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
    }),
    onSubmit: (values) => {
      //Handle envio de correo de contacto
      setDisplaySubmit(false);
      dispatch(sendConversationMail(values));
    },
  });

  useEffect(() => {
    if (mail?.mailConversationError?.ok === false) {
      setError(true);
      setTimeout(() => { setError(false); }, 2000);
      setDisplaySubmit(true);
    } else if (mail?.mailConversation?.ok) {
      setSuccess(true);
      setTimeout(() => { setSuccess(false); }, 2000);
      setDisplaySubmit(true);
    }
  }, [mail]);

  return (
    <div>
      {!isPrivate && (
        <Base img={img}>
          <div className={`container ${classes.footer__container}`}>
            <h1 className='h2 text__white mb-3'>¿Hablamos?</h1>
            <p style={{ fontWeight: 400 }} className='h5 text__white mb-10'>Déjanos tus datos para que nuestros expertos conecten contigo.</p>
          </div>
          <div className={classes.button__fab}>
            <button type='button' onClick={() => { setContactForm(!contactForm); formik.resetForm(); }}>
              {contactForm ? <Icon style={{ fontSize: '44px' }} id='MdExpandLess' /> : <Icon style={{ fontSize: '44px' }} id='MdExpandMore' />}
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
                            <Alert severity='success' className='mb-5'>Datos enviados correctamente</Alert>
                          </div>
                        </div>
                      )
                    }

                    {
                      error && (
                        <div className='row justify-center'>
                          <div className='flex-sm-12 flex-md-8 flex-lg-8 pb-5'>
                            <Alert severity='error' className='mb-5'>Ups!! Ocurrio un error, vuelve a intentarlo</Alert>
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
                          label='Celular*'
                          touched={formik.touched.phone}
                          errors={formik.errors.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                        />
                      </div>
                    </div>
                    <div className='row justify-center'>
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
                        <SelectUI defaultValue='Sup' label='Temas' required={true} options={[{ value: 'Sup', text: 'Soporte' }, { value: 'Com', text: 'Comercial' }, { value: 'Admin', text: 'Administración' }]} />
                      </div>
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
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
              <div className='row mb-5 px-5'>
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
                        <a href={config.termsPath}>términos y condiciones.</a>
                        {' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-5 mt-10 justify-center'>
                <div className='flex-md-4 flex-lg-3 flex-sm-12'>
                  {
                    displaySubmit &&
                    (
                      <Button styles='primary-blue' type='submit'>
                        ¡Me interesa!
                      </Button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className={classes.footer}>
        <div className={`container ${classes.footer__end}`}>
          <div className={classes.logo}>
            <div className={classes.logo__principal}>
              <LogoAlt />
              <div className={classes.logo__principal__sublogo}>
                <CustomIcon name='fintechwhite' />
              </div>
            </div>
            <CustomIcon name='apimarketwhite' />
          </div>
          <div className={classes.email}>
            <h1 className='body-1 font-weight-medium text__white mb-2'>Correo electrónico</h1>
            <p className='body-1 font-weight-bold text__white'>Empresas@towertech.com.co</p>
          </div>
          <div className={classes.policies}>
            <h1 className='body-1 font-weight-medium text__white mb-2'>Política de</h1>
            <p className='body-1 font-weight-bold'>
              <a href={config.policyPath} target='blank' className='text__white'>Privacidad de datos</a>
            </p>
          </div>

        </div>
        <div className={`container ${classes.footer__social}`}>
          <div className={classes.footer__social__copyright}>
            <p className='caption text-uppercase text__white mb-3'>
              &copy;
              {' '}
              <span>{ year }</span>
              {' '}
              TOWERTECH. TODOS LOS DERECHOS RESERVADOS
              {' '}
            </p>
          </div>
          <div className={classes.footer__social__icons}>
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
