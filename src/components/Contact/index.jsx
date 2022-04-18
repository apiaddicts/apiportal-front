import React from 'react';
import { useLocation } from 'react-router-dom';
import classes from './contact.module.scss';
// import Icon from '../MdIcon/Icon';
import Input from '../Input';
import Button from '../Buttons/Button';
import icons from '../../static/icons-sura';

function Contact() {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname !== '/blog');
  return (
    <div className={classes.contact}>
      <div className={pathname !== '/blog' ? classes.contact__container__alternative : classes.contact__container}>
        <div className={pathname !== '/blog' ? classes.contact__alternative__header : classes.contact__header}>
          <div className={classes.contact__header__icon}>
            {icons('email')}
          </div>
          <p className={pathname !== '/blog' ? classes.contact__alternative__title : classes.contact__header__title}>Sigamos conectados</p>
        </div>
        <div className={pathname !== '/blog' ? classes.contact__header__title__alternative : classes.contact__header__title}>
          <div className={pathname !== '/blog' ? classes.contact__alternative__description : classes.contact__description}>
            <p className=''>¡Entérate de lo último!</p>
          </div>
          <div className={pathname !== '/blog' ? classes.contact__alternative__description : classes.contact__description}>
            <p className=''> Escoge una o varias capacidades y sé el primero en enterarte.</p>
          </div>
        </div>
        <div className={pathname !== '/blog' ? classes.contact__container__alternative__form : classes.contact__container__form}>
          <form className={pathname !== '/blog' ? classes.contact__alternative__form : classes.contact__form}>
            <div className={classes.contact__form__input}>
              <Input type='text' placeholder='Nombre' />
            </div>
            <div className={classes.contact__form__input}>
              <Input type='text' placeholder='Correo' />
            </div>
            <div className={classes.contact__form__button}>
              <Button type='secundary'>
                SUSCRÍBETE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
