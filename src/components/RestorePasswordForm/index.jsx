import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOldPassword } from '../../redux/actions/userAction';
import useFormRestorePassword from '../../hooks/useFormRestorePassword';
import Button from '../Buttons/Button';
import Input from '../Input';
import Alert from '../Alert';
import Spinner from '../Spinner';
import { useTranslation } from 'react-i18next';

function RestorePasswordForm({ userEmail, display, toggleForm }) {
  const { t } = useTranslation();
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
      label: t('RestorePasswordForm.password'),
      validate: 'password',
      required: true,
      type: 'password',
      label_message: t('RestorePasswordForm.passwordRequired'),
    },
    {
      id: 'new_password',
      initialValue: '',
      placeholder: '********',
      label: t('RestorePasswordForm.newPassword'),
      validate: 'new_password',
      required: true,
      type: 'password',
      label_message: t('RestorePasswordForm.newPasswordRequired'),
    },
    {
      id: 'confirm_password',
      initialValue: '',
      placeholder: '********',
      label: t('RestorePasswordForm.confirmPassword'),
      validate: 'confirm_password',
      required: true,
      type: 'password',
      label_message: t('RestorePasswordForm.confirmPasswordRequired'),
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
                title={t('RestorePasswordForm.restoreErrorTitle')}
                msg={t('RestorePasswordForm.restoreErrorMessage')}
                display={true}
              />
            ) : null}
            {changePasswordFailure && Object.keys(changePasswordFailure).length > 0 ? (
              <Alert
                key={Math.floor(Math.random() * 100) + 1}
                css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                alert_type='alert__danger'
                title={t('RestorePasswordForm.passwordErrorTitle')}
                msg={t('RestorePasswordForm.passwordErrorMessage')}
                display={true}
              />
            ) : null}
            {changePasswordSuccess && Object.keys(changePasswordSuccess).length > 0 ? (
              <Alert
                key={Math.floor(Math.random() * 100) + 1}
                css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                alert_type='alert__success'
                title={t('RestorePasswordForm.successTitle')}
                msg={t('RestorePasswordForm.successMessage')}
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
                    {t('RestorePasswordForm.cancelButton')}
                  </Button>
                  <Button
                    type='submit'
                    styles='tertiary'
                    disabled={
                      !formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting
                    }
                    opacity={!formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting ? 0.5 : 1}
                  >
                    {t('RestorePasswordForm.saveButton')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Spinner title={t('RestorePasswordForm.loading')} />
      )}
    </div>
  );
}

export default RestorePasswordForm;
