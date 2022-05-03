import React from 'react';
import TypographyMUI from './style';

function TypographyUI({ title }) {
  return (
    <TypographyMUI gutterBottom component='div'>
      {title}
    </TypographyMUI>
  );
};

export default TypographyUI;
