import React from 'react';
import classes from './input.module.scss';

function InputResponse({ type = 'text', label, required = false, ...rest }) {

  return (
    <div className={classes.wrapper__input}>
      <input placeholder={label} type={type} required={required ? 'required' : ''} {...rest} />
      { required && (<span className={classes.required}>Requerido *</span>)}
    </div>
  );
}

export default InputResponse;
