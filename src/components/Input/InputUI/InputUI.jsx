/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './inputui.module.scss';
import Icon from '../../MdIcon/Icon';

function InputUI({ type = 'text', label, touched, errors, required = false, onChange, onBlur, ...rest }) {
  const { t } = useTranslation();
  const { value } = rest;
  const [isActive, setIsActive] = useState(false);
  const [typeInput, setTypeInput] = useState(type);
  const [initialValue, setInitialValue] = useState(() => {
    if (value === undefined) {
      return '';
    }
    return value;
  });

  const inputRef = useRef();
  function handleTextChange(text) {
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

  const togglePass = () => {
    if (typeInput === 'text') {
      setTypeInput('password');
    }
    if (typeInput === 'password') {
      setTypeInput('text');
    }
  };

  return (
    <div className={`${classes.wrapper__input} ${errors === undefined && initialValue.length > 0 && initialValue !== undefined ? '' : touched ? `${classes.error} ${classes.error__input__error}` : ''}`}>
      <input
        type={typeInput}
        value={initialValue}
        autoComplete='off'
        ref={inputRef}
        onChange={handleChange}
        onBlur={onBlur}
        {...rest}
      />
      <label className={isActive || initialValue.length > 0 ? `${classes.active}` : ''} onClick={() => { setIsActive(true); inputRef.current.focus(); }}>{t(label)}</label>
      {
        errors === undefined && initialValue.length < 0 ? null :
          errors === undefined && initialValue.length > 0 && type !== 'password' && type !== 'email' ? (
            <div className={`${classes.wrapper__icon} ${classes.success}`}>
              <Icon id='MdOutlineCheck' />
            </div>
          ) :
            type === 'password' ? (
              <div tabIndex='-1' className={classes.wrapper__icon} onClick={togglePass} role='button' style={{ cursor: 'pointer' }}>
                <Icon id={typeInput === 'password' ? 'MdRemoveRedEye' : 'MdVisibilityOff'} />
              </div>
            ) : null
      }
      { required && (<span className={classes.required}>{t('InputUI.required')}</span>)}
      { errors && touched === undefined ? null : (<p>{errors}</p>)}
    </div>
  );
}

export default InputUI;
