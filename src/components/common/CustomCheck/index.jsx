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
    handleChangeSelect(name, label, e.target.checked);
    setCheck(e.target.checked);

  };

  const configCheckbox = {
    onChange: handleChange,
    ...otherProps,
  };
  return (
    <FormControlMain>
      <FormGroup>
        <CustomFormControl
          active={!!((check && activeTab))}
          control={<CustomCheck {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControlMain>
  );
}

