import React from 'react';
import useContact from '../../../hooks/useContact';
import Button from '../../Buttons/Button';
import Input from '../../Input';
import './index.scss';

function ResetPassword() {

  const fields = [
    {
      id: 'email',
      initialValue: '',
      placeholder: 'Email',
      label: 'Email',
      validate: 'email',
      required: true,
      type: 'email',
    },
  ];

  const formConfig = useContact(fields);

  const handleSubmit = () => {
    const dataForm = formConfig.values;
    alert(JSON.stringify(dataForm, null, 2));
  };
  return (
    <div className='w-full px-8'>
      <p className='py-5 text__reset-password'>Introduce tu email y te enviaremos una nueva contraseña para que puedas acceder.</p>
      <form onSubmit={formConfig.handleSubmit}>
        <div className='py-4'>
          {fields.map((field) => (
            <Input key={field.id} field={field} formik={formConfig} />
          ))}
        </div>
        <div className='py-4 container__button'>
          <Button
            styles='secundary'
            onClick={() => {
              handleSubmit();
            }}
            type='submit'
          >
            Recuperar Contraseña

          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
