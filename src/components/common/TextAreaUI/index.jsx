import React from 'react';
import Textarea from './style';

function TextAreaUI({ placeholder }) {
  return (
    <Textarea
      minRows={3}
      placeholder={placeholder}
    />
  );
};

export default TextAreaUI;
