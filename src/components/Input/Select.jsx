import React from 'react';
import classes from './input.module.scss';

function Select({ field, formik, itemValue, itemText, items = [], styleInput, footer }) {
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
      <select
        id={field.id}
        name={field.id}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[field.id]}
        disabled={field.disabled}
        className={touched[field.id] && !!errors[field.id] ? classes.input__error : `${classes.input} ${styleInput}`}
      >
        <option selected disabled>{field.placeholder}</option>
        {items && items.length > 0 ? items.map((opt, index) => (
          <option value={opt[itemValue]} disabled={opt?.disabled} key={index}>{opt[itemText]}</option>
        )) : null}
      </select>
      {touched[field.id] && !!errors[field.id] ? (
        <p className={`${classes.wrapper__input__required}`}>{errors[field.id]}</p>
      ) : !values[field.id] ? (field.label && <p className={`${classes.wrapper__input__required}`}>{field.label_message}</p>) : null }
    </div>
  );
}

Select.propTypes = {};

export default Select;
