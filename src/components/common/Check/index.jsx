import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import classes from './checkbox.module.scss';

function CheckboxWrapper({
  name,
  label,
  legend,
  handleChangeSelect,
  ...otherProps
}) {

  const handleChange = (e) => {
    handleChangeSelect(name, label, e.target.checked);

  };

  const configCheckbox = {
    onChange: handleChange,
    ...otherProps,
  };

  return (
    <FormControl>
      <FormLabel component='legend'>{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              className={classes.custom__checkbox}
              {...configCheckbox}
            />
          )}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxWrapper;
