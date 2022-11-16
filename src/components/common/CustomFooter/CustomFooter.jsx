/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import classes from './customfooter.module.scss';
import Logo from '../../../static/img/logo.svg';
import config from '../../../services/config';

function CustomFooter() {
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;
  const socialLinks = [
    { link: 'https://apiquality.es', icon: <FaFacebookF /> },
    { link: 'https://apiquality.es', icon: <FaTwitter /> },
    { link: 'https://apiquality.es', icon: <FaYoutube /> },
    { link: 'https://apiquality.es', icon: <RiInstagramFill /> },
  ];

  return (
    <div className={classes.wrapper__footer}>
      <div className={classes.footer__end}>
        <div className={classes.Logo}>
          <img src={Logo} alt='' />
        </div>
        <div className={classes.email}>
          <h1 className='body-1 font-weight-medium text__dark__primary  mb-2'>Correo electronico</h1>
          <p className='body-1 font-weight-bold text__dark__primary '>contacto@apiquality.es</p>
        </div>
        <div className={classes.policies}>
          <h1 className='body-1 font-weight-medium text__dark__primary  mb-2'>Política de</h1>
          <p className='body-1 font-weight-bold text__dark__primary '>
            <a href={config.policyPath} target='blank' className='text__gray__gray_lighten-3'>Privacidad de datos</a>
          </p>
        </div>

      </div>
      <div className={classes.footer__social}>
        <div className={classes.footer__social__copyright}>
          <p className='caption text-uppercase text__dark__primary  mb-3'>
            &copy;
            {' '}
            <span>{ year }</span>
            {' '}
            API QUALITY. TODOS LOS DERECHOS RESERVADOS
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

export default CustomFooter;
