/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Icon from '../MdIcon/Icon';
import classes from './input.module.scss';

function Input({ field, formik, footer }) {
  const [type, setType] = useState(false);
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div style={footer ? { width: '50%', padding: '0 38px' } : { width: '100%' }} className={`${classes.wrapper__input} mt-3`}>
      {field.label && (
        <p>
          {field.label}
          {' '}
          *
        </p>
      )}
      <input
        className={touched[field.id] && !!errors[field.id] ? classes.input__error : classes.input}
        id={field.id}
        type={touched[field.id] && type ? 'text' : field.type}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={field.placeholder}
        value={values[field.id]}
      />
      <div
        onClick={() => {
          setType(!type);
        }}
        className={touched[field.id] && !!errors[field.id] ? classes.input__icon__right__error : classes.input__icon__right}
      >
        {field.icon && <Icon id={field.iconName} />}
      </div>
      {touched[field.id] && !!errors[field.id] ? (
        <p className={`${classes.wrapper__input__required}`}>{errors[field.id]}</p>
      ) : (field.label && <p className={`${classes.wrapper__input__required}`}>Requerido *</p>)}
    </div>
  );
}
export default Input;
