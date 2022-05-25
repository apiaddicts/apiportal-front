/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classes from './inputui.module.scss';

function InputUI({ type = 'text', label, required = false }) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');

  function handleTextChange(text) {
    setValue(text);
    if (text !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <div className={classes.wrapper__input}>
      <input type={type} required={required ? 'required' : ''} value={value} onChange={(e) => handleTextChange(e.target.value)} />
      <label className={isActive ? `${classes.active}` : ''}>{label}</label>
      { required && (<span className={classes.required}>Requerido *</span>)}
    </div>
  );
}

export default InputUI;
