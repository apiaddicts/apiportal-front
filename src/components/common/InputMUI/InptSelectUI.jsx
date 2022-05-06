import React from 'react';
import { InputSelect } from './style';

function InptSelectUI({ children, label, value, placeholder, ...rest }) {
  return (
    <InputSelect
      fullWidth
      select
      label={label}
      value={value}
      placeholder={placeholder}
      {...rest}
    >
      {children}
    </InputSelect>
  );
};

export default InptSelectUI;
