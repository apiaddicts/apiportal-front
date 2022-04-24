/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import Base from './Base';
import classes from './footer.module.scss';
import Icon from '../MdIcon/Icon';
import SuraLogo from '../../static/img/sura_logo.svg';
import Button from '../Buttons/Button';
import Input from '../Input';
import { fieldsContactExtend } from '../Forms/fields';
import useFormConfig from '../../hooks/useForm';

function Footer({ props }) {
  const img = 'https://picsum.photos/1920/300';
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;
  const handleSubmit = async (values) => {
    console.log(values);
  };

  const formConfig = useFormConfig(fieldsContactExtend, handleSubmit);

  const [contactForm, setContactForm] = useState(false);

  return (
    <div>
      <Base img={img}>
        <div className={classes.footer__container}>
          <div className={`${classes.divider} mb-4`} />
          <h1 className='h2 text__secondary__white'>Dejanos tus datos para asesorarte</h1>
          <p className='h5 text__secondary__white mb-10'>Contáctanos por medio de este formulario</p>
        </div>
        <div className={classes.button__fab}>
          <button type='submit' onClick={() => { setContactForm(!contactForm); }}>
            {contactForm ? <Icon id='MdClose' /> : <Icon id='MdMailOutline' />}
          </button>
        </div>
      </Base>

      {contactForm && (
        <div className={classes.footer__section}>
          <div className={`container ${classes.footer__section__contact}`}>
            <div className='mb-5'>
              <div className='grid-col-2'>
                {fieldsContactExtend.map((field) => (
                  field.label !== 'Mensaje' ? (
                    <Input key={field.id} field={field} formik={formConfig} />
                  ) : (
                    <div className='grid-col-1' key={field.id}>
                      <Input key={field.id} field={field} formik={formConfig} />
                    </div>
                  )
                ))}
              </div>
            </div>
            <div className='row mb-5'>
              <div className='flex-md-12 flex-sm-12'>
                <input type='checkbox' id='checkbox' />
                <label>Acepto recibir correos de acuerdo con los siguientes términos y condiciones.</label>
              </div>
            </div>
            <div className='row mb-5 mt-10 justify-center'>
              <div className='flex-md-3 flex-sm-12'>
                <Button type='secundary'>
                  ¡Estoy interesado!
                </Button>
              </div>
            </div>
          </div>
        </div>

      )}
      <div className={`container ${classes.footer__end}`}>
        <div className={classes.logo}>
          <img src={SuraLogo} alt='' />
        </div>
        <div className={classes.email}>
          <h1 className='body-1 font-weight-medium text__gray__gray_lighten-3'>Correo electronico</h1>
          <p className='body-1 font-weight-bold text__gray__gray_lighten-3'>mxEmpresasSura@segurossura.com.mex</p>
        </div>
        <div className={classes.policies}>
          <h1 className='body-1 font-weight-medium text__gray__gray_lighten-3'>Política de</h1>
          <p className='body-1 font-weight-bold text__gray__gray_lighten-3'>Privacidad de datos</p>
        </div>

      </div>
      <div className={`container ${classes.footer__social}`}>
        <div className={classes.footer__social__copyright}>
          <p className='caption text-uppercase text__gray__gray_lighten-3'>
            &copy;
            {' '}
            <span>{ year }</span>
            {' '}
            SEGUROS SURA S.S DE C.V. TODOS LOS DERECHOS RESERVADOS
            {' '}
          </p>
        </div>
        <div className={classes.footer__social__icons}>
          <FaFacebookF />
          <FaTwitter />
          <FaYoutube />
          <FaInstagram />
        </div>
      </div>

    </div>
  );
}

export default Footer;
