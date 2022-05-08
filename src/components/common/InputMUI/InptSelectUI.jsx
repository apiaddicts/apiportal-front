import React from 'react';
import { InputSelect } from './style';

function InptSelectUI({ children, label, value, placeholder, ...rest }) {
  console.log();
  return (
    <InputSelect
      fullWidth
      select
      label={value === '' && label}
      value={value}
      placeholder={placeholder}
      {...rest}
    >
      {children}
    </InputSelect>
  );
};

export default InptSelectUI;
