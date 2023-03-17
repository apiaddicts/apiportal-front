/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import classes from './customfooter.module.scss';
/*import Logo from '../../../static/img/logo.svg';*/
import config from '../../../services/config';
import CustomIcon from '../../MdIcon/CustomIcon';

function CustomFooter() {
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;
  const socialLinks = [
    { link: 'https://www.facebook.com/wolterskluwer', icon: <FaFacebookF /> },
    { link: 'https://twitter.com/Wolters_Kluwer', icon: <FaTwitter /> },
    { link: 'https://www.youtube.com/user/WoltersKluwerComms', icon: <FaYoutube /> },
    { link: 'https://www.linkedin.com/company/wolters-kluwer', icon: <FaLinkedinIn /> },
  ];

  return (
    <div className={classes.wrapper__footer}>
      <div className={classes.footer__end}>
        <div className={classes.logo}>
          <CustomIcon name='logo' />
        </div>
        <div className={classes.email}>
          <h1 className='body-1 font-weight-medium text__dark__primary  mb-2'>Correo electronico</h1>
          <p className='body-1 font-weight-bold text__dark__primary '>a3developers@wolterskluwer.com</p>
        </div>
      </div>
      <div className={classes.footer__legals}>
        <div className={classes.legal}>
          <p className='body-1 text__dark__primary font-weight-bold'>
            <a href={config.legalWarningPath} target='blank' className='text__dark__primary'>Aviso Legal</a>
          </p>
        </div>
        <div className={classes.privacy}>
          <p className='body-1 text__dark__primary font-weight-bold'>
            <a href={config.legalWarningPath} target='blank' className='text__dark__primary'>Aviso Legal</a>
          </p>
        </div>
        <div className={classes.cookies}>
          <p className='body-1 text__dark__primary font-weight-bold'>
            <a href={config.legalWarningPath} target='blank' className='text__dark__primary'>Aviso Legal</a>
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
            WOLTERS KLUWER. TODOS LOS DERECHOS RESERVADOS
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
