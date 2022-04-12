import React from 'react';
import Icon from '../MdIcon/Icon';
import classes from './input.module.scss';

function SearchInput({ ...props }) {

  return (
    <div className={classes.input__wrapper}>
      <input className={classes.input__search} {...props} />
      <div className={classes.input__icon}>
        <Icon id='MdSearch' />
      </div>
    </div>
  );
}

export default SearchInput;
