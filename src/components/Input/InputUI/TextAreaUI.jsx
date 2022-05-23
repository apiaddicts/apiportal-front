/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classes from './inputui.module.scss';

function TextAreaUI({ label, rows = 3, counter = 10, required = false }) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);

  function handleTextChange(text, length) {
    setCount(length);
    console.log(count);
    setValue(text);
    if (text !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  return (
    <div className={classes.wrapper__input}>
      <textarea rows={rows} value={value} required={required} maxLength={counter} onChange={(e) => handleTextChange(e.target.value, e.target.value.length)} />
      <label className={isActive ? `${classes.active}` : ''}>{label}</label>
      <span style={{ textAlign: 'end', padding: '0 30px', color: '#8189A9', fontWeight: '400' }}>{`${count}/${counter}`}</span>
    </div>
  );
}

export default TextAreaUI;
