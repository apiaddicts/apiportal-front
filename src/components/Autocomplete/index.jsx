/* eslint-disable no-else-return */
import React, { useState } from 'react';
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function index({ onChange, options, value, className, isMulti, isCreatable = false, placeholderText, usr }) {

  const navigate = useNavigate();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const defaultValue = (options, value) => {

    if (options && value) {
      return isMulti ?
        options.filter((option) => value.findIndex((e) => e.value === option.value) >= 0) :
        options.find((option) => option.value === value);
    } else {
      return isMulti ? [] : '';
    }
    /* return options ? options.find((option, i) => option.value === value[i].value) : []; */
  };

  const handleCreate = (inputValue) => {
    navigate('/developer/groups/newGroup', { state: {
      displayName: inputValue,
      wasCreated: true,
      usr: usr || '',
    } });
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
      {isCreatable ? (
        <Creatable
          placeholder={placeholderText}
          value={defaultValue(options, value)}
          onChange={(value) => onChange(value)}
          options={options}
          isMulti={isMulti}
          menuIsOpen={menuIsOpen}
          onCreateOption={handleCreate}
          onInputChange={handleValue}
          isSearchable={true}
          styles={{ control: (baseStyles, state) => ({ ...baseStyles, borderRadius: 100, border: '1px solid #ECF0F1', boxShadow: '0px 2px 20px #ECF0F1' }) }}
        />
      ) : (
        <Select
          placeholder={placeholderText}
          value={defaultValue(options, value)}
          onChange={(value) => onChange(value)}
          options={options}
          isMulti={isMulti}
          menuIsOpen={menuIsOpen}
          onInputChange={handleValue}
          styles={{ control: (baseStyles, state) => ({ ...baseStyles, borderRadius: 100, border: '1px solid #ECF0F1', boxShadow: '0px 2px 20px #ECF0F1' }) }}
        />
      )}
    </div>
  );
}

export default index;
