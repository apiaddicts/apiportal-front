/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classes from './inputui.module.scss';

function SelectUI({ label, options = [] }) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');
  console.log(value);
  function handleSelect(value) {
    setValue(value);
    if (value !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  return (
    <div className={classes.wrapper__input}>
      <select placeholder='Temas' onChange={(e) => handleSelect(e.target.value.length)}>
        <option selected />
        {
          options.length > 0 ? (
            options.map((opt, i) => {
              return (
                <option value={opt.value}>{opt.text}</option>
              );
            })
          ) : (<option value='0'>Sin opciones por mostrar</option>)
        }
      </select>
      <label className={isActive ? `${classes.active}` : ''}>{label}</label>
    </div>
  );
}

export default SelectUI;
