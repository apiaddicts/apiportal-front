import React from 'react';
import { useDispatch } from 'react-redux';
import { verifyOldPassword } from '../../../../redux/actions/userAction';
import useFormRestorePassword from '../../../../hooks/useFormRestorePassword';
import Button from '../../../../components/Buttons/Button';
import Input from '../../../../components/Input';
import Alert from '../../../../components/Alert';
import { restorePasswordField } from '../../adminField';

function RestorePassword({ userEmail, display }) {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const data = {
      email: userEmail,
      password: values.password,
      new_password: values.new_password,
    };
    dispatch(verifyOldPassword(data));
  };

  const formConfig = useFormRestorePassword(restorePasswordField, handleSubmit);
  const displayClass = display ? 'd-block' : 'd-none';
  return (
    <form onSubmit={formConfig.handleSubmit}>
      <div className={displayClass}>
        <Alert
          css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
          alert_type='alert__danger'
          title='Error with password'
        />
        <div className='row'>
          {restorePasswordField.map((field, i) => (
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

export default RestorePassword;
