import React from 'react';
import classes from './input.module.scss';

function Input({ field, formik }) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div className={classes.wrapper__input}>
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
        type={field.type}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={field.placeholder}
        value={values[field.id]}
      />
      {touched[field.id] && !!errors[field.id] ? (
        <p className={`${classes.wrapper__input__required} mt-2`}>{errors[field.id]}</p>
      ) : (field.label && <p className={`${classes.wrapper__input__required} mt-2`}>Required *</p>)}
    </div>
  );
}
export default Input;
