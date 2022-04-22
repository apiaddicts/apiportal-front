import React from 'react';
import classes from './input.module.scss';

function Input({ field, formik }) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div>
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
        <p>{errors[field.id]}</p>
      ) : null}
    </div>
  );
}
export default Input;
