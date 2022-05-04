import { Box, MenuItem, Typography } from '@mui/material';
import React from 'react';
import Select from 'react-select';
import InptSelectUI from '../../components/common/InputMUI/InptSelectUI';
import TextAreaUI from '../../components/common/TextAreaUI';

function Information({ fakeData }) {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  console.log(fakeData['name-app']);
  return (
    <Box>
      <Typography variant='h7'>
        NOMBRE DE LA APP
      </Typography>
      <InptSelectUI label='Nombre de la app'>
        {fakeData['name-app'].map((option, index) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </InptSelectUI>
      <div className='row'>
        <div className='flex-lg-6 flex-sm-12'>
          <InptSelectUI label='Nombre de la app'>
            {fakeData['organization'].map((option, index) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </InptSelectUI>
        </div>
        <div className='flex-lg-6 flex-sm-12 reltive'>
          <Select isMulti options={options} />
        </div>
        <div className='flex-lg-12 flex-sm-12'>
          <TextAreaUI
            minRows={3}
            placeholder='Descripción'
          />
        </div>
      </div>
    </Box>
  );
}

export default Information;
