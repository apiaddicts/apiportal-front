/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';
import { RiInstagramFill } from 'react-icons/ri';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Base from './Base';
import classes from './footer.module.scss';
import Icon from '../MdIcon/Icon';
import SuraLogo from '../../static/img/sura_logo.svg';
import Button from '../Buttons/Button';
import InputUI from '../Input/InputUI/InputUI';
import TextAreaUI from '../Input/InputUI/TextAreaUI';
import SelectUI from '../Input/InputUI/SelectUI';

function Footer({ isPrivate }) {
  const img = 'https://picsum.photos/1920/300';
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;
  const socialLinks = [
    { link: 'https://www.facebook.com/SegurosSURAMexico/', icon: <FaFacebookF /> },
    { link: 'https://twitter.com/SegurosSURA_MX', icon: <FaTwitter /> },
    { link: 'https://www.youtube.com/channel/UCXm_a8qOYWL4oYnzHcoeWlw', icon: <FaYoutube /> },
    { link: 'https://www.instagram.com/segurossuramx/', icon: <RiInstagramFill /> },
  ];
  const [contactForm, setContactForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      topic: '',
      subject: '',
      message: '',
    },
    onSubmit: (values) => {
      //Handle envio de correo de contacto
      //TODO:Implementar envio de correo
    },
    validate: (values) => {
      const errors = {};
      // if (!values.name) {
      //   errors.name = 'Campo obligatorio';
      // }
      // if (!values.email) {
      //   errors.email = 'Campo obligatorio';
      // } else if (
      //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      // ) {
      //   errors.email = 'Correo electrónico invalido';
      // }
      return errors;
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Campo requerido'),
      lastname: Yup.string().required('Campo requerido'),
      email: Yup.string().email('Correo electrónico invalido').required('Campo requerido'),
      phone: Yup.number().required('Campo requerido'),
      topic: Yup.string().required('Campo requerido'),
      subject: Yup.string().required('Campo requerido'),
      message: Yup.string().length(50, 'Limite de caracteres 50').required('Campo requerido'),
    }),
  });

  return (
    <div>
      {!isPrivate && (
        <Base img={img}>
          <div className={`container ${classes.footer__container}`}>
            <div className={`${classes.divider} mb-4`} />
            <h1 className='h2 text__secondary__white mb-3'>Dejanos tus datos para asesorarte</h1>
            <p style={{ fontWeight: 400 }} className='h5 text__secondary__white mb-10'>Contáctanos por medio de este formulario</p>
          </div>
          <div className={classes.button__fab}>
            <button type='button' onClick={() => { setContactForm(!contactForm); }}>
              {contactForm ? <Icon style={{ fontSize: '44px' }} id='MdClose' /> : <GoMail style={{ fontSize: '44px' }} />}
            </button>
          </div>
        </Base>
      )}

      {contactForm && (
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.footer__section}>
            <div className={`container ${classes.footer__section__contact}`}>
              <div className='mb-5'>
                <div className='row justify-center'>
                  <div className='container'>
                    <div className='row justify-center'>
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
                        <InputUI
                          name='name'
                          id='name'
                          type='text'
                          label='Nombre*'
                          errors={formik.errors.name}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          required={true}
                        />
                      </div>
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
                        <InputUI
                          name='lastname'
                          id='lastname'
                          type='text'
                          label='Apellidos*'
                          errors={formik.errors.lastname}
                          onChange={formik.handleChange}
                          value={formik.values.lastname}
                          required={true}
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
                          errors={formik.errors.email}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          required={true}
                        />
                      </div>
                      <div className='flex-sm-12 flex-md-4 flex-lg-4 pb-10'>
                        <InputUI
                          name='phone'
                          id='phone'
                          type='tel'
                          label='Celular*'
                          errors={formik.errors.phone}
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          required={true}
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
                          errors={formik.errors.subject}
                          onChange={formik.handleChange}
                          value={formik.values.subject}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className='row justify-center'>
                      <div className='flex-sm-12 flex-md-8 flex-lg-8 pb-5'>
                        <TextAreaUI label='Mensaje' counter={50} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-5 px-5'>
                <div className='container'>
                  <div className='row justify-center'>
                    <div className={`flex-sm-12 flex-md-8 flex-sm-8 ${classes.footer__section__contact__terms}`}>
                      <input type='checkbox' id='checkbox' />
                      <span>
                        {' '}
                        Acepto recibir correos de acuerdo con los siguientes
                        {' '}
                        <a href=''>términos y condiciones.</a>
                        {' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-5 mt-10 justify-center'>
                <div className='flex-md-4 flex-lg-3 flex-sm-12'>
                  <Button styles='secundary' type='submit'>
                    ¡Estoy interesado!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className={`container ${classes.footer__end}`}>
        <div className={classes.logo}>
          <img src={SuraLogo} alt='' />
        </div>
        <div className={classes.email}>
          <h1 className='body-1 font-weight-medium text__gray__gray_lighten-3 mb-2'>Correo electronico</h1>
          <p className='body-1 font-weight-bold text__gray__gray_lighten-3'>mxEmpresasSura@segurossura.com.mx</p>
        </div>
        <div className={classes.policies}>
          <h1 className='body-1 font-weight-medium text__gray__gray_lighten-3 mb-2'>Política de</h1>
          <p className='body-1 font-weight-bold text__gray__gray_lighten-3'>Privacidad de datos</p>
        </div>

      </div>
      <div className={`container ${classes.footer__social}`}>
        <div className={classes.footer__social__copyright}>
          <p className='caption text-uppercase text__gray__gray_lighten-3 mb-3'>
            &copy;
            {' '}
            <span>{ year }</span>
            {' '}
            SEGUROS SURA S.S DE C.V. TODOS LOS DERECHOS RESERVADOS
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
  );
}

export default Footer;
