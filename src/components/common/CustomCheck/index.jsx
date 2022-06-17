import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import { CustomFormControl, CustomCheck, FormControlMain } from './stye';

export default function CheckboxLabels({ name,
  label,
  legend,
  activeTab,
  handleChangeSelect,
  ...otherProps
}) {
  const [check, setCheck] = useState(false);

  const handleChange = (e) => {
    setCheck(e.target.checked);
    handleChangeSelect(name, label, e.target.checked);
  };

  const configCheckbox = {
    onChange: handleChange,
    ...otherProps,
  };

  return (
    <FormControlMain>
      <FormGroup>
        <CustomFormControl
          active={check ? 'active' : undefined}
          control={<CustomCheck {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControlMain>
  );
}

