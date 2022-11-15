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
              sx={{
                '&.MuiCheckbox-root': {
                  borderRadius: '10px',
                },
                '&.Mui-checked': {
                  color: '#14234B',
                },
              }}
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
