import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useFormForgotPassword from '../../../hooks/useFormForgotPassword';
import Button from '../../Buttons/Button';
import InputUI from '../../Input/InputUI/InputUI';
import { fieldsForgotPassword } from '../fields';
import Alert from '../../Alert';
import './index.scss';
import { forgotPassword } from '../../../redux/actions/authAction';

function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const handleSubmit = (dataForm) => {
    dispatch(forgotPassword(dataForm.email));
  };

  const formConfig = useFormForgotPassword(fieldsForgotPassword, handleSubmit);

  return (
    <div className="container">
      <p className="py-5 text__reset-password">
        {t('ForgotPassword.instructions')}
      </p>

      {success && (
        <Alert
          css_styles={{ custom_padding: 'p-4', custom_margin: 'mb-5' }}
          alert_type="alert__success"
          title={t('ForgotPassword.requestSent')}
        />
      )}

      {error && (
        <Alert
          css_styles={{ custom_padding: 'p-4', custom_margin: 'mb-5' }}
          alert_type="alert__error"
          title={t('Common.error')}
          description={error?.message || t('Common.genericError')}
        />
      )}

      <form onSubmit={formConfig.handleSubmit} noValidate>
        <div className="py-4">
          {fieldsForgotPassword.map((field) => (
            <div className="row" key={field.id}>
              <div className="flex-sm-12 flex-md-12 flex-lg-12">
                <InputUI
                  id={field.id}
                  name={field.id}
                  label={t(`ForgotPassword.${field.id}`)}
                  type={field.type}
                  touched={formConfig.touched[field.id]}
                  errors={formConfig.errors[field.id]}
                  onChange={formConfig.handleChange}
                  onBlur={formConfig.handleBlur}
                  value={formConfig.values[field.id]}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="container pt-5">
          <div className="row justify-center">
            <div className="flex-sm-12 flex-md-10 flex-lg-10">
              <Button
                styles="tertiary"
                type="submit"
                disabled={
                  loading ||
                  !formConfig.dirty ||
                  !formConfig.isValid ||
                  formConfig.isSubmitting
                }
                opacity={
                  loading ||
                  !formConfig.dirty ||
                  !formConfig.isValid ||
                  formConfig.isSubmitting
                    ? 0.5
                    : 1
                }
              >
                {t('ForgotPassword.recoverPasswordButton')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
