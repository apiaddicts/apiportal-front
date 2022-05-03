import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';

function CheckboxWrapper({
  name,
  label,
  legend,
  handleChangeSelect,
  ...otherProps
}) {

  const handleChange = (e) => {
    handleChangeSelect(name, label);

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
