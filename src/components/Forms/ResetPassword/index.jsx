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
      <p className='py-5 text__reset-password'>Introduce tu email y te enviaremos un correo electrónico de confirmación de cambio de contraseña con las instrucciones para que puedas realizar el cambio de contraseña.</p>
      <Alert
        key={Math.floor(Math.random() * 100) + 1}
        css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
        alert_type='alert__success'
        title='Solicitud enviada'
      />
      <form onSubmit={formConfig.handleSubmit} noValidate>
        <div className='py-4'>
          {fieldsForgotPassword.map((field) => (
            <Input key={field.id} field={field} formik={formConfig} />
          ))}
        </div>
        <div className='container pt-5'>
          <div className='row justify-center'>
            <div className='flex-sm-12 flex-md-10 flex-lg-10'>
              <Button
                styles='primary-blue'
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
          </div>
        </div>
        {/* <div className='py-4 container__button'>
          <Button
            styles='primary-blue'
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
        </div> */}
      </form>
    </div>
  );
};

export default ResetPassword;
