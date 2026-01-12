import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';
import Button from '../Buttons/Button';
import Input from '../Input';

function Form({ handleSubmit }) {
  const { t } = useTranslation();
  const [dataForm, setDataForm] = useState({});
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleInputChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    
    if (!executeRecaptcha) {
      console.warn( "Recaptcha not yet available");
      return;
    }

    
    const token = await executeRecaptcha('login');

    
    if (!token) {
      console.error("No se pudo generar el token reCAPTCHA");
      return;
    }


    console.log('Datos del formulario + token:', {
      ...dataForm,
      recaptchaToken: token
    });

    
    handleSubmit(e, { ...dataForm, recaptchaToken: token });
  };


  return (
    <form onSubmit={onSubmit} noValidate>
      <div className='my-2 w-full'>
        <Input
          placeholder={t('Form.emailPlaceholder')}
          type='email'
          name='email'
          onChange={handleInputChange}
        />
      </div>
      {/* <div className='my-2 w-full'>
        <Input
          placeholder={t('Form.passwordPlaceholder')}
          type='password'
          name='password'
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Button styles='secundary' type='submit'>
          {t('Form.loginButton')}
        </Button>
      </div>
    </form>
  );
}

export default Form;
