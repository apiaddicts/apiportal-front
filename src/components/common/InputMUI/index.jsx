import React, { useState } from 'react';
import Input, { ContainerIcon, ContainerInput } from './style';

function TextField({ field, formik, iconEye, iconCopy }) {
  const [type, setType] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, isSelect } = formik;

  // Copy text to clipboard of input

  const copyToClipboard = (value) => {
    const input = document.createElement('input');
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };

  return (
    <ContainerInput>
      <ContainerIcon
        icon
        onClick={() => {
          setType(!type);
        }}
      />
      <ContainerIcon onClick={() => {
        copyToClipboard(formik.values[field.id]);
      }}
      />
      <Input
        select={isSelect}
        fullWidth
        required={field.required && true}
        id={field.id}
        label={field.label}
        disabled={field.disabled}
        error={touched[field.id] && !!errors[field.id]}
        type={field.id && type ? 'text' : field.type}
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
