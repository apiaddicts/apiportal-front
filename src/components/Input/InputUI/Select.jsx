import React from 'react';
import classes from './inputui.module.scss';

function Select({ name, label, placeholder, items, itemText, itemValue, defaultValue, onChange, onBlur, ...rest }) {

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedItem = items.filter((item) => item.id === selectedId);
    onChange(selectedItem && selectedItem.length > 0 ? selectedItem[0] : undefined);
  };

  return (
    <div className={classes.wrapper__input}>
      <select
        id={name}
        name={name}
        onChange={handleChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        className={classes.custom__select}
        {...rest}
      >
        <option selected>{placeholder}</option>
        {items && items.length > 0 ? items.map((item) => (
          <option value={item.id} key={item[itemValue]}>{item[itemText]}</option>
        )) : null}
      </select>
      <label className={classes.active} htmlFor={name}>{label}</label>
    </div>
  );
}

export default Select;
