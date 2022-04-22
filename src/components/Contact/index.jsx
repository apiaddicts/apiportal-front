import React from 'react';
import { useLocation } from 'react-router-dom';
import classes from './contact.module.scss';
// import Icon from '../MdIcon/Icon';
import Input from '../Input';
import Button from '../Buttons/Button';
import icons from '../../static/icons-sura';
import { fieldsContact } from '../Forms/fields';
import useLoginConfig from '../../hooks/useLogin';

function Contact() {
  const location = useLocation();
  const { pathname } = location;

  const handleSubmit = async (values) => {
    console.log(values);
  };

  const formConfig = useLoginConfig(fieldsContact, handleSubmit);

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
            {fieldsContact.map((field) => (
              <Input key={field.id} field={field} formik={formConfig} />
            ))}
            <div className={classes.contact__form__button}>
              <Button styles='secundary'>
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
