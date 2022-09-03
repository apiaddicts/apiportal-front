/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classes from './inputui.module.scss';

function TextAreaUI({ label, rows = 3, counter = 10, required = false, value, touched, errors, onChange, onBlur, ...rest }) {
  const [isActive, setIsActive] = useState(false);
  const [initialValue, setInitialValue] = useState(() => {
    if (value === undefined) {
      return '';
    }
    return value;
  });
  // const [value, setValue] = useState('');
  const [count, setCount] = useState(0);

  function handleTextChange(text) {
    setCount(text.length);
    setInitialValue(text);
    if (text !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  const handleChange = (e) => {
    if (onChange) onChange(e);
    handleTextChange(e.target.value);
  };

  return (
    <div className={classes.wrapper__input}>
      <textarea
        rows={rows}
        value={initialValue}
        required={required}
        maxLength={counter}
        onChange={handleChange}
        {...rest}
      />
      <label className={isActive ? `${classes.active}` : ''}>{label}</label>
      <span style={{ textAlign: 'end', padding: '0 30px', color: '#8189A9', fontWeight: '400' }}>{`${count}/${counter}`}</span>
    </div>
  );
}

export default TextAreaUI;
