import React, { useState } from 'react';
import Input, { ContainerIcon, ContainerInput, InputDisabled } from './style';
import Icon from '../../MdIcon/Icon';

function TextField({ field, formik, iconEye, iconCopy }) {
  const [type, setType] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, isSelect } = formik;

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
      {iconEye && (
        <ContainerIcon
          icon
          onClick={() => {
            setType(!type);
          }}
        >
          <Icon id='MdOutlineRemoveRedEye' />
        </ContainerIcon>
      )}
      {iconCopy && (
        <ContainerIcon onClick={() => {
          copyToClipboard(formik.values[field.id]);
        }}
        >
          <Icon id='MdOutlineContentCopy' />
        </ContainerIcon>
      )}
      {field.disabled ? (
        <InputDisabled
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
      ) : (
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
          // value={values[field.id]}
          value={field.initialValue !== '' ? field.initialValue : values[field.id]}
          // value={value[field.id] === '' && field.initialValue !== '' ? field.initialValue : value[field.id]}
        />

      )}
    </ContainerInput>
  );
};

export default TextField;
