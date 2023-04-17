/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classes from './InputUI/inputui.module.scss';
import Icon from '../MdIcon/Icon';

function InputKeys({ type = 'text', label, touched, errors, required = false, onChange, onBlur, regenerate, handleRegenerate, ...rest }) {

  const { value } = rest;
  const [isActive, setIsActive] = useState(true);
  const [typeInput, setTypeInput] = useState(type);
  const [initialValue, setInitialValue] = useState(() => {
    if (value === undefined) {
      return '';
    }
    return value;
  });

  const [copied, setCopied] = useState(false);

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

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className={`${classes.wrapper__input__keys} ${errors === undefined && initialValue.length > 0 && initialValue !== undefined ? '' : touched ? `${classes.error} ${classes.error__input__error}` : ''}`}>
      <input
        type={typeInput}
        value={initialValue}
        autoComplete='off'
        ref={inputRef}
        onChange={handleChange}
        onBlur={onBlur}
        {...rest}
      />
      <label className={isActive || initialValue.length > 0 ? `${classes.active}` : ''} onClick={() => { setIsActive(true); inputRef.current.focus(); }}>{label}</label>
      {
        errors === undefined && initialValue.length < 0 ? null :
          errors === undefined && initialValue.length > 0 && type !== 'password' && type !== 'email' ? (
            <div className={`${classes.wrapper__icon} ${classes.success}`}>
              <Icon id='MdOutlineCheck' />
            </div>
          ) :
            errors === undefined && type === 'password' ? (
              <div className={classes.show__hide} onClick={togglePass} role='button' tabIndex={0}>
                <Icon id='MdRemoveRedEye' />
              </div>
            ) :
              errors !== undefined && touched !== undefined ? (
                <div className={`${classes.show__hide} ${classes.wrapper__icon__error}`}>
                  <Icon id='MdErrorOutline' />
                </div>
              ) : null
      }
      <CopyToClipboard onCopy={onCopy} text={value}>
        <span className={classes.copy__clipboard}>
          <Icon id='MdContentCopy' />
        </span>
      </CopyToClipboard>
      {regenerate && (
        <div className={classes.regenerate__icon} onClick={handleRegenerate} role='button' tabIndex={0}>
          <CachedIcon />
        </div>
      )}
      { copied ? (<span className={classes.success}>Copiado en el portapapeles</span>) : null}
    </div>
  );
};

export default InputKeys;
