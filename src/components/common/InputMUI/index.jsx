import React from 'react';
import Input, { ContainerIcon, ContainerInput } from './style';

function TextField({ field, formik, iconEye, iconCopy }) {
  const { values, errors, touched, handleChange, handleBlur, isSelect } = formik;

  return (
    <ContainerInput>
      <ContainerIcon icon={true} />
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
    </ContainerInput>
  );
};

export default TextField;
