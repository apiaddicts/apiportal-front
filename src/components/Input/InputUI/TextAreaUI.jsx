/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Icon from '../../MdIcon/Icon';
import classes from './inputui.module.scss';

function TextAreaUI({ label, rows = 3, counter = 200, required = false, value, touched, errors, onChange, onBlur, ...rest }) {
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
    <div className={`${classes.wrapper__input} ${errors === undefined && initialValue.length > 0 && initialValue !== undefined ? '' : touched ? `${classes.error} ${classes.error__input__error}` : ''}`}>
      <textarea
        rows={rows}
        value={initialValue}
        required={required}
        maxLength={counter}
        onChange={handleChange}
        onBlur={onBlur}
        {...rest}
      />
      <label className={isActive ? `${classes.active}` : ''}>{label}</label>
      <span style={{ textAlign: 'end', padding: '0 30px', color: '#8189A9', fontWeight: '400' }}>{`${count}/${counter}`}</span>
      {
        errors === undefined && initialValue.length < 0 ? null :
          errors === undefined && initialValue.length > 0 ? (
            <div className={`${classes.wrapper__icon} ${classes.success}`}>
              <Icon id='MdOutlineCheck' />
            </div>
          ) :
            errors !== undefined && touched !== undefined ? (
              <div className={`${classes.textarea_wrapper__icon} ${classes.textarea_wrapper__icon__error}`}>
                <Icon id='MdErrorOutline' />
              </div>
            ) : null
      }
      { required && (<span className={classes.required}>{isActive}</span>)}
      { errors && touched === undefined ? null : (<p>{errors}</p>)}
    </div>
  );
}

export default TextAreaUI;
