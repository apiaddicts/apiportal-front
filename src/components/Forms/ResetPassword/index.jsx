import React from 'react';
import { useDispatch } from 'react-redux';
import useFormForgotPassword from '../../../hooks/useFormForgotPassword';
import Button from '../../Buttons/Button';
import Input from '../../Input';
import { fieldsForgotPassword } from '../fields';
import { resetPassword } from '../../../redux/actions/userAction';
import Alert from '../../Alert';
import './index.scss';

function ResetPassword() {
  const dispatch = useDispatch();
  const handleSubmit = (dataForm) => {
    const data = {
      properties: {
        to: dataForm.email,
        appType: 'developerPortal',
      },
    };
    dispatch(resetPassword(data));
  };
  const formConfig = useFormForgotPassword(fieldsForgotPassword, handleSubmit);

  return (
    <div className='w-full px-8'>
      <p className='py-5 text__reset-password'>Introduce tu email y te enviaremos una nueva contraseña para que puedas acceder.</p>
      <Alert
        css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
        alert_type='alert__success'
        title='Solicitud enviada'
      />
      <form onSubmit={formConfig.handleSubmit}>
        <div className='py-4'>
          {fieldsForgotPassword.map((field) => (
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
            disabled={
              !formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting
            }
            opacity={!formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting ? 0.5 : 1}
          >
            Recuperar Contraseña
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
