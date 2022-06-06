/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classes from './inputui.module.scss';

function InputUI({ type = 'text', label, required = false, ...rest }) {
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
      <input type={type} required={required ? 'required' : ''} value={value} onKeyPress={(e) => handleTextChange(e.target.value)} {...rest} />
      <label className={isActive ? `${classes.active}` : ''}>{label}</label>
      { required && (<span className={classes.required}>{isActive}</span>)}
    </div>
  );
}

export default InputUI;
