import React from 'react';
import Icon from '../MdIcon/Icon';
import classes from './input.module.scss';

function SearchInput(props) {
  return (
    <div className={classes.input__wrapper}>
      <input type='text' placeholder='Buscar' className={classes.input__search} />
      <div className={classes.input__icon}>
        <Icon id='MdSearch' />
      </div>
    </div>
  );
}

export default SearchInput;
