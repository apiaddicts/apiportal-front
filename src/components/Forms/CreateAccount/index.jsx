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
        appType: 'portal',
        confirmation: 'signup',
        password: values.password,
        notify: true,
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
      {fieldsRegister.map((field) => (
        <div className='mb-2'>
          <Input footer key={field.id} field={field} formik={formConfig} />
        </div>
      ))}
      {/* checkbox */}
      <div className='create-account__checkbox'>
        <input type='checkbox' id='checkbox' />
        <span>
          Acepto recibir correos de acuerdo con los siguientes
          {' '}
          <span className='text-bold'>términos y condiciones</span>
          .
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', width: '100%' }}>
        <Button
          style={{ gridColumn: '5/9' }}
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
      {/* <Dialog
        formStatus={formConfig.formStatus}
        setFormStatus={formConfig.setStatus}
        redirectTo='/'
      /> */}
    </form>
  );
}

export default CreateAccount;
