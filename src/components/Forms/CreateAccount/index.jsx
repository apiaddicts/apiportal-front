import React from 'react';

import { useDispatch } from 'react-redux';

import Input from '../../Input';
import useFormConfig from '../../../hooks/useForm';
import Button from '../../Buttons/Button';
import { fieldsRegister } from '../fields';
import { signUp } from '../../../redux/actions/userAction';

import './index.scss';

function CreateAccount() {
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
    >
      {fieldsRegister.filter((item) => item.type !== 'checkbox').map((field, index) => (
        <div className='mb-2' key={index}>
          <Input key={field.id} field={field} formik={formConfig} />
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
      <div className='end-create-btn'>
        <div className='end-create-btn-input'>
          <Button
            style={{ width: '100%' }}
            styles='primary-blue'
            type='submit'
            disabled={
              !formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting
            }
            opacity={!formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting ? 0.5 : 1}
          >
            Registrarme
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateAccount;
