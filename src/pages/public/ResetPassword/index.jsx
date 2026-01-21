import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '../../../components/Buttons/Button';
import InputUI from '../../../components/Input/InputUI/InputUI';

import classes from './reset-password.module.scss';
import { resetPassword } from '../../../redux/actions/authAction';
import useFormRestorePassword from '../../../hooks/useFormRestorePassword';
import LanguageSelector from '../../../components/LanguageSelector/LanguageSelector';

function ResetPassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const { loading, success, error } = useSelector((state) => state.auth);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (success) {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [success, navigate]);

  const fields = [
    { id: 'password', initialValue: '' },
    { id: 'confirmPassword', initialValue: '' },
  ];

  const formik = useFormRestorePassword(
    fields,
    async ({ password, confirmPassword }) => {
      if (!code) {
        setLocalError(t('ResetPassword.error'));
        return { status: 'error' };
      }

      const result = await dispatch(resetPassword(code, password, confirmPassword));

      if (result?.error) {
        return {
          status: 'error',
          message: t('ResetPassword.error'),
        };
      }

      return { status: 'success' };
    }
  );

  return (
    <div>
      <div className={classes.navbar}>
        <div className={classes.navbar__content} />
        <LanguageSelector />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.wrapper__content}>

          <div className={classes.wrapper__content__text}>
            <h1>{t('ResetPassword.title')}</h1>

            {(error || localError) && (
              <div className={classes.inlineError}>
                {t('ResetPassword.error')}
              </div>
            )}

            {success && (
              <div className={classes.inlineSuccess}>
                {t('ResetPassword.success')}
              </div>
            )}
          </div>
          <div className="py-10">
            <InputUI
              name="password"
              label={t('ResetPassword.labelPassword')}
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <div className="pb-10">
            <InputUI
              name="confirmPassword"
              label={t('ResetPassword.labelConfirm')}
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
            />
          </div>

          <Button
            styles="primary-dinamic"
            onClick={formik.handleSubmit}
            disabled={loading || !formik.isValid}
          >
            {loading ? t('ResetPassword.processing') : t('ResetPassword.submit')}
          </Button>

        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
