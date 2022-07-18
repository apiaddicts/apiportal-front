/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useState } from 'react';
import React from 'react';
import classes from './input.module.scss';

function SelectResponse({ label, options = [] }) {
  // const [isActive, setIsActive] = useState(false);
  // // const [value, setValue] = useState('');
  function handleSelect(value) {
  //   // setValue(value);
  //   if (value !== '') {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  };

  return (
    <div className={classes.wrapper__input}>
      <select onChange={(e) => handleSelect(e.target.value.length)}>
        <option disabled selected>{label}</option>
        {
          options.map((opt, i) => {
            return (
              <option value={opt.value}>{opt.text}</option>
            );
          })
        }
      </select>
    </div>
  );
}

export default SelectResponse;
