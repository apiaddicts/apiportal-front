import React from 'react';
import { Box, FormLabel } from '@mui/material';
import Textarea from './style';

function TextAreaUI({ placeholder }) {
  return (
    <Box mt={2}>
      <FormLabel sx={{ marginLeft: '20px', color: '#0033A0' }} component='legend'>{placeholder}</FormLabel>
      <Textarea
        minRows={3}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default TextAreaUI;
