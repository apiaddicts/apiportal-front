import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import Base from './Base';
import classes from './footer.module.scss';
import Icon from '../MdIcon/Icon';
import SuraLogo from '../../static/img/sura_logo.svg';

function Footer({ props }) {
  const img = 'https://picsum.photos/1920/300';
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;

  return (
    <div>
      <Base img={img}>
        <div className={classes.footer__container}>
          <div className={`${classes.divider} mb-4`} />
          <h1 className='h2 text__secondary__white'>Dejanos tus datos para asesorarte</h1>
          <p className='h5 text__secondary__white mb-10'>Contáctanos por medio de este formulario</p>
        </div>
        <div className={classes.button__fab}>
          <button type='submit'>
            <Icon id='MdMailOutline' />
          </button>
        </div>
      </Base>
      <div className={`container ${classes.footer__end}`}>
        <div>
          <img src={SuraLogo} alt='' />
        </div>
        <div className='text-right'>
          <h1 className='body-1 font-weight-medium text__gray__gray_lighten-3'>Correo electronico</h1>
          <p className='body-1 font-weight-bold text__gray__gray_lighten-3'>mxEmpresasSura@segurossura.com.mex</p>
        </div>
        <div className='text-right'>
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
