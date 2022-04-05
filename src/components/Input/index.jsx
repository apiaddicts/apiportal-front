import React from 'react';
import classes from './input.module.scss';

function Input({ placeholder, type, name, value }) {

  return (
    <input className={classes.input} type={type} name={name} placeholder={placeholder} />
  );
};

export default Input;
