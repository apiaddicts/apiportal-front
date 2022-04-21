import React from 'react';
import Button from '../../Buttons/Button';
import Input from '../../Input';
import './index.scss';

function ResetPassword() {
  return (
    <div className='w-full px-8'>
      <p className='py-5 text__reset-password'>Introduce tu email y te enviaremos una nueva contraseña para que puedas acceder.</p>
      <div className='py-4'>
        <Input placeholder='Email' type='email' />
      </div>
      <div className='py-4 container__button'>
        <Button styles='secundary'>Recuperar Contraseña</Button>
      </div>
    </div>
  );
};

export default ResetPassword;
