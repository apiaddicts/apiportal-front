import React from 'react';
import { useDispatch } from 'react-redux';
import { verifyOldPassword } from '../../redux/actions/userAction';
import useFormRestorePassword from '../../hooks/useFormRestorePassword';
import Button from '../Buttons/Button';
import Input from '../Input';
import Alert from '../Alert';

function RestorePasswordForm({ userEmail, display }) {
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
    <form onSubmit={formConfig.handleSubmit} noValidate>
      <div className={displayClass}>
        <Alert
          key={Math.floor(Math.random() * 100) + 1}
          css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
          alert_type='alert__danger'
          title='Error con contraseña'
        />
        <div className='row'>
          {restorePasswordFields.map((field, i) => (
            <div className='flex-lg-6 flex-sm-12'>
              <Input key={i} field={field} formik={formConfig} />
            </div>
          ))}

          <div className='flex-lg-3 flex-sm-12 display_flex align_items__bottom justify_content__end ml-auto mb-2'>
            <Button
              type='submit'
              styles='primary'
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
    </form>
  );
}

export default RestorePasswordForm;
