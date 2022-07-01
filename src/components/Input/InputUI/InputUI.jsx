/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import classes from './inputui.module.scss';

function InputUI({ type = 'text', label, touched, errors, required = false, onChange, onBlur, ...rest }) {
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
    <div className={`${classes.wrapper__input} ${errors === undefined ? '' : `${classes.error}`}`}>
      <input
        type={type}
        required={required ? 'required' : ''}
        value={value}
        autoComplete='off'
        ref={inputRef}
        onKeyDown={(e) => handleTextChange(e.target.value)}
        onChange={handleChange}
        onBlur={onBlur}
        {...rest}
      />
      <label className={isActive ? `${classes.active}` : ''} onClick={() => { setIsActive(true); inputRef.current.focus(); }}>{label}</label>
      { required && (<span className={classes.required}>{isActive}</span>)}
      { errors && touched === undefined ? null : (<p>{errors}</p>)}
    </div>
  );
}

export default InputUI;
