/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import classes from './customfooter.module.scss';
import SuraLogo from '../../../static/img/sura_logo.svg';

function CustomFooter() {
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;

  return (
    <div className={classes.wrapper__footer}>
      <div className={classes.footer__end}>
        <div className={classes.logo}>
          <img src={SuraLogo} alt='' />
        </div>
        <div className={classes.email}>
          <h1 className='body-1 font-weight-medium text__gray__gray_lighten-3 mb-2'>Correo electronico</h1>
          <p className='body-1 font-weight-bold text__gray__gray_lighten-3'>mxEmpresasSura@segurossura.com.mex</p>
        </div>
        <div className={classes.policies}>
          <h1 className='body-1 font-weight-medium text__gray__gray_lighten-3 mb-2'>Política de</h1>
          <p className='body-1 font-weight-bold text__gray__gray_lighten-3'>Privacidad de datos</p>
        </div>

      </div>
      <div className={classes.footer__social}>
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
          <FaFacebookF />
          <FaTwitter />
          <FaYoutube />
          <RiInstagramFill />
        </div>
      </div>

    </div>
  );
}

export default CustomFooter;
