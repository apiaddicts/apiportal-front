import React from 'react';
import Input from '../../Input';
import useFormConfig from '../../../hooks/useForm';
import Button from '../../Buttons/Button';
import { fieldsRegister } from '../fields';
import './index.scss';

function CreateAccount() {
  const handleSubmit = async (values) => {
    console.log(values);
  };

  const formConfig = useFormConfig(fieldsRegister, handleSubmit);

  return (
    <form
      className='create-account'
      onSubmit={formConfig.handleSubmit}
    >
      {fieldsRegister.map((field) => (
        <Input key={field.id} field={field} formik={formConfig} />
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
      <Button
        styles='secundary'
        type='submit'
        disabled={
          !formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting
        }
        opacity={!formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting ? 0.5 : 1}
      >
        Submit
      </Button>
      {/* <Dialog
        formStatus={formConfig.formStatus}
        setFormStatus={formConfig.setStatus}
        redirectTo='/'
      /> */}
    </form>
  );
}

export default CreateAccount;
