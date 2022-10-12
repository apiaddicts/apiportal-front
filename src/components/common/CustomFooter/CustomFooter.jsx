/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import classes from './customfooter.module.scss';
import SuraLogo from '../../../static/img/logo.svg';

function CustomFooter() {
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;
  const socialLinks = [
    { link: 'https://www.facebook.com/SegurosSURAMexico/', icon: <FaFacebookF /> },
    { link: 'https://twitter.com/SegurosSURA_MX', icon: <FaTwitter /> },
    { link: 'https://www.youtube.com/channel/UCXm_a8qOYWL4oYnzHcoeWlw', icon: <FaYoutube /> },
    { link: 'https://www.instagram.com/segurossuramx/', icon: <RiInstagramFill /> },
  ];

  return (
    <div className={classes.wrapper__footer}>
      <div className={classes.footer__end}>
        <div className={classes.logo}>
          <img src={SuraLogo} alt='' />
        </div>
        <div className={classes.email}>
          <h1 className='body-1 font-weight-medium text__secondary mb-2'>Correo electronico</h1>
          <p className='body-1 font-weight-bold text__secondary'>Empresas@towertech.com.co</p>
        </div>
        <div className={classes.policies}>
          <h1 className='body-1 font-weight-medium text__secondary mb-2'>Política de</h1>
          <p className='body-1 font-weight-bold text__secondary'>Privacidad de datos</p>
        </div>

      </div>
      <div className={classes.footer__social}>
        <div className={classes.footer__social__copyright}>
          <p className='caption text-uppercase text__secondary mb-3'>
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
  );
}

export default CustomFooter;
