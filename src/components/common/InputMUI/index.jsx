import React from 'react';
import Input from './style';

function TextField({ field, formik, ...rest }) {
  const { values, errors, touched, handleChange, handleBlur, isSelect } = formik;

  return (
    <Input
      select={isSelect}
      fullWidth
      required={field.required && true}
      id={field.id}
      label={field.label}
      disabled={field.disabled}
      error={touched[field.id] && !!errors[field.id]}
      type={field.type}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={field.placeholder}
      value={values[field.id]}
      // helperText={(touched[field.id] && errors[field.id]) ?? null}
    />
  );
};

export default TextField;
