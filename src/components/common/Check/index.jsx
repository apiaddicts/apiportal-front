import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';

function CheckboxWrapper({
  name,
  label,
  legend,
  ...otherProps
}) {

  const handleChange = (evt) => {
    const { checked } = evt.target;
    console.log(name, checked);
  };

  const configCheckbox = {
    onChange: handleChange,
  };

  return (
    <FormControl>
      <FormLabel component='legend'>{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxWrapper;
