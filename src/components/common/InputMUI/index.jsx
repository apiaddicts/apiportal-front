import React from 'react';
import Input from './style';

function TextField({ field, formik }) {
  const { values, errors, touched, handleChange, handleBlur, isSelect } = formik;

  return (
    <Input
      select={isSelect}
      fullWidth
      required
      id={field.id}
      label={field.label}
      error={touched[field.id] && !!errors[field.id]}
      //   type={touched[field.id] && type ? 'text' : field.type}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={field.placeholder}
      value={values[field.id]}
      helperText={(touched[field.id] && errors[field.id]) ?? null}
    />
  );
};

export default TextField;
