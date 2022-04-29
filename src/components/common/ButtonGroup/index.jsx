import * as React from 'react';
import ButtonGroupCustom from './style';

export default function ButtonGroupMUI({ children, ...rest }) {
  return (
    <ButtonGroupCustom variant='outlined' {...rest}>
      {children}
    </ButtonGroupCustom>
  );
}
