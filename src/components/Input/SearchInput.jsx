import React from 'react';
import Icon from '../MdIcon/Icon';
import classes from './input.module.scss';

function SearchInput({ icon, borderRadius, ...rest }) {

  return (
    <div className={classes.input__wrapper}>
      <input style={{ borderRadius }} className={classes.input__search} {...rest} />
      {icon && (
        <div className={classes.input__icon}>
          <Icon id='MdSearch' />
        </div>
      )}
    </div>
  );
}

export default SearchInput;
