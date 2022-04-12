import React from 'react';
import classes from './contact.module.scss';
import Icon from '../MdIcon/Icon';
import Input from '../Input';
import Button from '../Buttons/Button';

function Contact() {
  return (
    <div className={classes.contact}>
      <div className={classes.contact__container}>
        <div className={classes.contact__header}>
          <div className={classes.contact__header__icon}>
            <Icon id='MdMailOutline' />
          </div>
          <p className={classes.contact__header__title}>Sigamos conectados</p>
        </div>
        <div className={classes.contact__description}>
          <p className=''>¡Entérate de lo último!</p>
        </div>
        <div className={classes.contact__description}>
          <p className=''> Escoge una o varias capacidades y sé el primero en enterarte.</p>
        </div>
        <div className={classes.contact__container__form}>
          <form className={classes.contact__form}>
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
