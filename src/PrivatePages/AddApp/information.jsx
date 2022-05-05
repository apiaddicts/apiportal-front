import { Box, MenuItem } from '@mui/material';
import React from 'react';
import Select from 'react-select';
import CustomTooltip from '../../components/common/ToolTip';
import InptSelectUI from '../../components/common/InputMUI/InptSelectUI';
import TextAreaUI from '../../components/common/TextAreaUI';
import { TypographyUI } from '../../components/common/TypographyMUI/style';

function Information({ fakeData, styles }) {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  console.log(fakeData['name-app']);
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
        <CustomTooltip text='Name App'>
          ?
        </CustomTooltip>
        <TypographyUI>
          NOMBRE DE LA APP
        </TypographyUI>
      </Box>
      <InptSelectUI label='Nombre de la app'>
        {fakeData['name-app'].map((option, index) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </InptSelectUI>
      <div className='row mt-9'>
        <div className='flex-lg-6 flex-sm-12'>
          <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
            <CustomTooltip text='Name App'>
              ?
            </CustomTooltip>
            <TypographyUI>
              ORGANIZACIÓN
            </TypographyUI>
          </Box>
          <InptSelectUI label='Nombre de la app'>
            {fakeData['organization'].map((option, index) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </InptSelectUI>
        </div>
        <div className='flex-lg-6 flex-sm-12 reltive'>
          <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
            <CustomTooltip text='No delimitará seleccionar apis de otras soluciones'>
              ?
            </CustomTooltip>
            <TypographyUI>
              SOLUCION DE REFERENCIA
            </TypographyUI>
          </Box>
          <Select isMulti options={options} />
        </div>
        <div className={`${styles['mt-85']} flex-lg-12 flex-sm-12 mt-9`}>
          <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
            <CustomTooltip text='Name App'>
              ?
            </CustomTooltip>
            <TypographyUI>
              DESCRIPCIÓN DE LA APP
            </TypographyUI>
          </Box>
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
