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
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '1rem',
      }}
      onSubmit={formConfig.handleSubmit}
    >
      {fieldsRegister.map((field) => (
        <Input key={field.id} field={field} formik={formConfig} />
      ))}
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
