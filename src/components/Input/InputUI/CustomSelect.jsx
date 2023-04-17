import React from 'react';
import { useField } from 'formik';
import classes from './inputui.module.scss';

function CustomSelect(props) {
  const { name, placeholder, label, items, itemText, itemValue, defaultValue, onChange, onBlur, ...rest } = props;
  const [field] = useField(props);
  return (
    <div className={classes.wrapper__input}>
      <select
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        {...rest}
        {...field}
      >
        <option selected>{placeholder}</option>
        {items && items.length > 0 ? items.map((item, index) => (
          <option value={item[itemValue]} key={index}>{item[itemText]}</option>
        )) : null}
      </select>
      <label className={classes.active} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

CustomSelect.propTypes = {};

export default CustomSelect;
