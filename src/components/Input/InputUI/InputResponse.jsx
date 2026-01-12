import React from 'react';
import { useTranslation } from 'react-i18next';
import classes from './input.module.scss';

function InputResponse({ type = 'text', label, required = false, ...rest }) {
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper__input}>
      <input placeholder={t(label)} type={type} required={required ? 'required' : ''} {...rest} />
      { required && (<span className={classes.required}>{t('InputResponse.required')}</span>)}
    </div>
  );
}

export default InputResponse;
