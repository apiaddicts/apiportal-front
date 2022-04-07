import React from 'react';
import classes from './contact.module.scss';
import Icon from '../MdIcon/Icon';
import Input from '../Input';

function Contact() {
  return (
    <div
      style={{
        width: '100%',
      }}
      className={classes.contact}
    >
      <div className={classes.contact__container}>
        <div className={classes.contact__header}>
          <Icon id='MdMailOutline' />
          <p className='h1 '>Sigamos conectados</p>
        </div>
        <div className={classes.contact__description}>
          <p className=''>¡Entérate de lo último!  Escoge una o varias capacidades y sé el primero en enterarte.</p>
        </div>
        <div className={classes.contact__container__form}>
          <form className={classes.contact__form}>
            <div className={classes.contact__form__input}>
              <Input type='text' placeholder='Nombre' />
            </div>
            <div className={classes.contact__form__input}>
              <Input type='text' placeholder='Correo' />
            </div>
            <div className={classes.contact__form__input}>
              <Input
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                type='submit'
                value='SUSCRÍBETE'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
