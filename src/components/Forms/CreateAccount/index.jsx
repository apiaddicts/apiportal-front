import React from 'react';

import { useDispatch } from 'react-redux';

import InputUI from '../../Input/InputUI/InputUI';
import useFormConfig from '../../../hooks/useForm';
import Button from '../../Buttons/Button';
import { fieldsRegister } from '../fields';
import { signUp } from '../../../redux/actions/userAction';

import './index.scss';

function CreateAccount({ setOpenForm, setIsOpen }) {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const data = {
      properties: {
        email: values.email,
        firstName: values.first_name,
        lastName: values.last_name,
        appType: 'developerPortal',
        confirmation: 'signup',
        password: values.password,
        state: 'pending',
      },
    };

    dispatch(signUp(data));
  };

  const formConfig = useFormConfig(fieldsRegister, handleSubmit);

  return (
    <form
      className='create-account'
      onSubmit={formConfig.handleSubmit}
      noValidate
    >
      {fieldsRegister.filter((item) => item.type !== 'checkbox').map((field, index) => (
        <div className='input_field'>
          <InputUI
            id={field.id}
            name={field.name}
            type={field.type}
            label={field.label}
            touched={formConfig.touched[field.id]}
            errors={formConfig.errors[field.id]}
            onChange={formConfig.handleChange}
            onBlur={formConfig.handleBlur}
            value={formConfig.values.name}
          />
        </div>
      ))}
      {/* checkbox */}
      <div className='container create-account__checkbox'>
        {
          fieldsRegister.filter((field) => field.type === 'checkbox')
            .map((field, index) => (
              <input
                key={index}
                type={field.type}
                id={field.id}
                name={field.name}
                value={field.value}
                checked={formConfig.values.remember}
                onChange={formConfig.handleChange}
              />
            ))
        }
        <span className={`ml-2 ${formConfig.errors.terms ? 'text__error' : ''}`}>
          Acepto recibir correos de acuerdo con los siguientes
          {' '}
          <b>términos y condiciones.</b>
        </span>
      </div>
      <div className='register__btn'>
        <Button
          styles='secundary-white'
          type='button'
          onClick={() => {
            setOpenForm(false);
            setIsOpen(true);
          }}
        >
          Iniciar Sesión
        </Button>
        <Button
          styles='primary-blue'
          type='submit'
        >
          Registrarme
        </Button>
      </div>
    </form>
  );
}

export default CreateAccount;
