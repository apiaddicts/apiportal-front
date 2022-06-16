/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import classes from './inputui.module.scss';

function InputUI({ type = 'text', label, required = false, onChange, ...rest }) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

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
      <input type={type} required={required ? 'required' : ''} value={value} ref={inputRef} onKeyPress={(e) => handleTextChange(e.target.value)} onChange={handleChange} {...rest} />
      <label className={isActive ? `${classes.active}` : ''} onClick={() => { setIsActive(true); inputRef.current.focus(); }}>{label}</label>
      { required && (<span className={classes.required}>{isActive}</span>)}
    </div>
  );
}

export default InputUI;
