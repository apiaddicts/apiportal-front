import React from 'react';
import classes from './form-error.module.scss';

function FormError({ children, compact = false }) {
  if (!children) return null;
  return (
    <p role="alert" className={`${classes.error} ${compact ? classes.compact : ''}`.trim()}>
      {children}
    </p>
  );
}

export default FormError;
