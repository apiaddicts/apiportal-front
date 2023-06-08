import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOldPassword } from '../../redux/actions/userAction';
import useFormRestorePassword from '../../hooks/useFormRestorePassword';
import Button from '../Buttons/Button';
import Input from '../Input';
import Alert from '../Alert';
import Spinner from '../Spinner';

function RestorePasswordForm({ userEmail, display, toggleForm }) {
  const { loadingSignUp, changePasswordSuccess, changePasswordFailure, responseRestoreError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const data = {
      email: userEmail,
      password: values.password,
      new_password: values.new_password,
    };
    dispatch(verifyOldPassword(data));
  };

  const restorePasswordFields = [
    {
      id: 'password',
      initialValue: '',
      placeholder: '********',
      label: 'Contraseña',
      validate: 'password',
      required: true,
      type: 'password',
      label_message: 'La contraseña actual es obligatoria',
    },
    {
      id: 'new_password',
      initialValue: '',
      placeholder: '********',
      label: 'Nueva Contraseña',
      validate: 'new_password',
      required: true,
      type: 'password',
      label_message: 'La nueva contraseña es obligatoria',
    },
    {
      id: 'confirm_password',
      initialValue: '',
      placeholder: '********',
      label: 'Confirmar Contraseña',
      validate: 'confirm_password',
      required: true,
      type: 'password',
      label_message: 'La confirmación de contraseña es obligatoria',
    },
  ];

  const formConfig = useFormRestorePassword(restorePasswordFields, handleSubmit);
  const displayClass = display ? 'd-block' : 'd-none';
  return (
    <div>
      {!loadingSignUp ? (
        <form onSubmit={formConfig.handleSubmit} noValidate>
          <div className={displayClass}>
            {responseRestoreError && Object.keys(responseRestoreError).length > 0 ? (
              <Alert
                key={Math.floor(Math.random() * 100) + 1}
                css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                alert_type='alert__danger'
                title='Sucedio un error al restablecer contraseña'
                msg='Verifique que su contraseña anterior sea correcta, intente nuevamente.'
                display={true}
              />
            ) : null}
            {changePasswordFailure && Object.keys(changePasswordFailure).length > 0 ? (
              <Alert
                key={Math.floor(Math.random() * 100) + 1}
                css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                alert_type='alert__danger'
                title='Error con contraseña'
                msg='Verifique que su contraseña anterior sea correcta, intente nuevamente.'
                display={true}
              />
            ) : null}
            {changePasswordSuccess && Object.keys(changePasswordSuccess).length > 0 ? (
              <Alert
                key={Math.floor(Math.random() * 100) + 1}
                css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                alert_type='alert__success'
                title='Contraseña modificada'
                msg='Su contraseña se ha modificado exitosamente'
                display={true}
              />
            ) : null}
            <div className='row'>
              {restorePasswordFields.map((field, i) => (
                <div className='flex-lg-6 flex-sm-12' key={i}>
                  <Input field={field} formik={formConfig} />
                </div>
              ))}

              <div className='flex-lg-3 flex-sm-12 display_flex align_items__bottom justify_content__end ml-auto mb-2'>
                <div className='display_flex justify_content__between'>
                  <Button
                    styles='secundary-white'
                    onClick={() => { toggleForm(); formConfig.resetForm(); formConfig.handleReset(); }}
                    type='reset'
                  >
                    Cancelar
                  </Button>
                  <Button
                    type='submit'
                    styles='tertiary'
                    disabled={
                      !formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting
                    }
                    opacity={!formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting ? 0.5 : 1}
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Spinner title='Cargando...' />
      )}
    </div>
  );
}

export default RestorePasswordForm;
