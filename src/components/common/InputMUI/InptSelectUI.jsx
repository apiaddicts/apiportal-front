import React from 'react';
import { InputSelect } from './style';

function InptSelectUI({ children, label, value, ...rest }) {
  return (
    <InputSelect
      fullWidth
      select
      label={label}
      value={value}
      {...rest}
    >
      {children}
    </InputSelect>
  );
};

export default InptSelectUI;
