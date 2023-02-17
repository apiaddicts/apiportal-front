import React from 'react';
import { useDispatch } from 'react-redux';
import useFormForgotPassword from '../../../hooks/useFormForgotPassword';
import Button from '../../Buttons/Button';
import InputUI from '../../Input/InputUI/InputUI';
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
    <div className='container'>
      <p className='py-5 text__reset-password'>Introduce tu email y te enviaremos un correo electrónico de confirmación de cambio de contraseña con las instrucciones para que puedas realizar el cambio de contraseña.</p>
      <Alert
        key={Math.floor(Math.random() * 100) + 1}
        css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
        alert_type='alert__success'
        title='Solicitud enviada'
      />
      <form onSubmit={formConfig.handleSubmit} noValidate>
        <div className='py-4'>
          {fieldsForgotPassword.map((field) => {
            return (
              <div className='row' key={field.id}>
                <div className='flex-sm-12 flex-md-12 flex-lg-12'>
                  <InputUI
                    id={field.id}
                    name={field.id}
                    label={field.placeholder}
                    type={field.type}
                    touched={formConfig.touched[field.id]}
                    errors={formConfig.errors[field.id]}
                    onChange={formConfig.handleChange}
                    onBlur={formConfig.handleBlur}
                    value={formConfig.values.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className='container pt-5'>
          <div className='row justify-center'>
            <div className='flex-sm-12 flex-md-10 flex-lg-10'>
              <Button
                styles='tertiary'
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
