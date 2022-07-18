import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { CustomFormControl, CustomCheck, FormControlMain } from './stye';

function CheckboxLabels({ name,
  label,
  legend,
  activeTab,
  checked,
  handleChangeSelect,
  ...otherProps
}) {
  const handleChange = (e) => {
    handleChangeSelect(name, label, e.target.checked);
  };

  const configCheckbox = {
    onChange: handleChange,
    checked,
    ...otherProps,
  };

  return (
    <FormControlMain>
      <FormGroup>
        <CustomFormControl
          active={checked ? 'active' : undefined}
          control={<CustomCheck {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControlMain>
  );
}

export default CheckboxLabels;
