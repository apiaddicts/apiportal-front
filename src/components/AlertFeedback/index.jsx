import React from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '../MdIcon/Icon';
import classes from './alert.module.scss';

function AlertFeedbock({ setShowAlert, error, success }) {
  const { t } = useTranslation();

  return (
    <div className={classes.alert}>
      <button
        className={classes.alert__close__button}
        type='button'
        onClick={() => {
          setShowAlert(false);
        }}
      >
        <Icon id='MdClose' />
      </button>
      <div className={error ? classes.alert__error : classes.alert__success}>
        {error && (
          <div className={classes.alert__error__wrapper}>
            <div className={classes.alert__error__icon}>
              <Icon id='MdWarning' />
            </div>
            <div className={classes.alert__error__message}>
              <p className={classes.alert__error__title}>{t('AlertFeedback.errorLogin')}</p>
              <p>
                {t('AlertFeedback.incorrectData')}
                {' '}
                <span>{t('AlertFeedback.forgotPassword')}</span>
              </p>
            </div>
          </div>
        )}
        {success && (
          <div className={classes.alert__success__wrapper}>
            <div className={classes.alert__success__icon}>
              <Icon id='MdWarning' />
            </div>
            <div className={classes.alert__success__message}>
              <p className={classes.alert__success__title}>{t('AlertFeedback.successLogin')}</p>
              <p>
                {t('AlertFeedback.passwordChangeEmail')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AlertFeedbock;
