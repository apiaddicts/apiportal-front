/* eslint-disable no-else-return */
import React, { useState } from 'react';
import Select from 'react-select';

function formikAutocomplete() {

  const { onChange, options, value, className, isMulti, placeholderText } = props;
  const [field] = props;

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const defaultValue = (options, value) => {

    if (options && value) {
      return isMulti ?
        options.filter((option) => value.findIndex((e) => e.value === option.value) >= 0) :
        options.find((option) => option.value === value);
    } else {
      return isMulti ? [] : '';
    }
  };

  const handleValue = (inputValue) => {
    if (inputValue.trim().length > 0) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  };

  return (
    <div className={className}>
      <Select
        placeholder={placeholderText}
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
        isMulti={isMulti}
        menuIsOpen={menuIsOpen}
        onInputChange={handleValue}
        styles={{ control: (baseStyles, state) => ({ ...baseStyles, borderRadius: 100, border: '1px solid #ECF0F1', boxShadow: '0px 2px 20px #ECF0F1' }) }}
        {...field}
      />
    </div>
  );
}

export default formikAutocomplete;
