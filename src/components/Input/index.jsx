import React from 'react';
import classes from './input.module.scss';

function Input({ placeholder, type, name, value, onChange, errorBack, success, ...rest }) {
  return (
    <div>
      <input className={errorBack ? classes.input__error : classes.input ? (success ? classes.success : classes.input) : classes.input} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} {...rest} />
    </div>
  );
}
export default Input;
