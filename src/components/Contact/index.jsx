import React from 'react';
// import { useLocation } from 'react-router-dom';
import classes from './contact.module.scss';
// import Icon from '../MdIcon/Icon';
import Input from '../Input';
import Button from '../Buttons/Button';
import icons from '../../static/icons-sura';
import { fieldsContact } from '../Forms/fields';
import useLoginConfig from '../../hooks/useLogin';

function Contact({ css_styles, pathname }) {

  const { display_contact, display_detail_description, border_radius } = css_styles;
  // const location = useLocation();
  // const { pathname } = location;

  const handleSubmit = async (values) => {
    console.log(values);
  };

  const formConfig = useLoginConfig(fieldsContact, handleSubmit);

  return (
    <div className={`${classes.contact} ${display_contact} ${classes[border_radius]}`}>
      <div className={pathname !== '/blog' ? classes.contact__container__alternative : classes.contact__container}>
        <div className={pathname !== '/blog' ? classes.contact__alternative__header : classes.contact__header}>
          <div className={classes.contact__header__icon}>
            {icons('email')}
          </div>
          <p className={pathname !== '/blog' ? classes.contact__alternative__title : classes.contact__header__title}>Sigamos conectados</p>
          <p className={`pt-5 pb-2 d-none text__primary fs__22 m-0 ${display_detail_description} d-xs-none`}>¡Entérate de lo último! Escoge una o varias capacidades y sé el primero en enterarte.</p>
        </div>
        <div className={pathname !== '/blog' ? classes.contact__header__title__alternative : classes.contact__header__title}>
          <div className={pathname !== '/blog' ? classes.contact__alternative__description : classes.contact__description}>
            <p className='pt-5 pb-2'>¡Entérate de lo último! </p>
          </div>
          <div className={pathname !== '/blog' ? classes.contact__alternative__description : classes.contact__description}>
            <p className=''> Escoge una o varias capacidades y sé el primero en enterarte.</p>
          </div>
        </div>
        <div className={pathname !== '/blog' ? classes.contact__container__alternative__form : classes.contact__container__form}>
          <form className={pathname !== '/blog' ? classes.contact__alternative__form : classes.contact__form}>
            {fieldsContact.map((field) => (
              <Input styleInput={classes.contact__form__new} key={field.id} field={field} formik={formConfig} />
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

Contact.defaultProps = {
  css_styles: '',
};

export default Contact;
