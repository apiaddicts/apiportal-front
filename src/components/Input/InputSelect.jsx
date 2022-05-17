/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classes from './input.module.scss';

function InputSelect() {
  return (
    <div className={classes['form-group']}>
      <label htmlFor='exampleFormControlSelect1'>Ordenar por Name (A-Z)</label>
      <div className={classes['form-control-select']} id='exampleFormControlSelect1'>
        <option>1</option>
      </div>
    </div>

  );
};

export default InputSelect;
