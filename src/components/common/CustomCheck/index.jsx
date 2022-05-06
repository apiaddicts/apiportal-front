import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { FormControl, FormLabel } from '@mui/material';
import { CustomFormControl, CustomCheck } from './stye';

export default function CheckboxLabels({ name,
  label,
  legend,
  activeTab,
  handleChangeSelect,
}) {

  const handleChange = (e) => {
    handleChangeSelect(name, label, e.target.checked);

  };

  const configCheckbox = {
    onChange: handleChange,
  };
  return (
    <FormControl>
      <FormLabel component='legend'>{legend}</FormLabel>
      <FormGroup>
        <CustomFormControl active={label === activeTab && true} control={<CustomCheck {...configCheckbox} />} label={label} />
      </FormGroup>
    </FormControl>
  );
}

