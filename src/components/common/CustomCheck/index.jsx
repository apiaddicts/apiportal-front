import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import { CustomFormControl, CustomCheck, FormControlMain } from './stye';

export default function CheckboxLabels({ name,
  label,
  legend,
  activeTab,
  handleChangeSelect,
}) {
  const [check, setCheck] = useState(false);

  const handleChange = (e) => {
    handleChangeSelect(name, label, e.target.checked);
    setCheck(e.target.checked);

  };

  const configCheckbox = {
    onChange: handleChange,
  };
  return (
    <FormControlMain>
      <FormGroup>
        <CustomFormControl active={(label && check)} control={<CustomCheck {...configCheckbox} />} label={label} />
      </FormGroup>
    </FormControlMain>
  );
}

