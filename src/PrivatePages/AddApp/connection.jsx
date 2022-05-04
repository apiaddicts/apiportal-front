import React from 'react';
import { Box } from '@mui/material';
import CustomTooltip from '../../components/common/ToolTip';
import { TypographyUI } from '../../components/common/TypographyMUI/style';
import TextField from '../../components/common/InputMUI';
import { fieldsAppSandbox } from './field';
import useNewApp from '../../hooks/useNewApp';
import CheckboxWrapper from '../../components/common/Check';

function Connection() {

  const handleSubmit = async (dataForm) => {
    console.log(dataForm);
  };

  const formConfig = useNewApp(fieldsAppSandbox, handleSubmit);
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
          <CustomTooltip text='Name App'>
            ?
          </CustomTooltip>
          <TypographyUI>
            EnTORNO SANDBOX
          </TypographyUI>
        </Box>
        <div className='row'>
          {fieldsAppSandbox.map((field) => (
            <div className='flex-lg-4 flex-sm-12'>
              <TextField field={field} formik={formConfig} />
            </div>
          ))}
        </div>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
          <CustomTooltip text='Name App'>
            ?
          </CustomTooltip>
          <TypographyUI>
            EnTORNO PRE
          </TypographyUI>
        </Box>
        <div className='row'>
          {fieldsAppSandbox.map((field) => (
            <div className='flex-lg-4 flex-sm-12'>
              <TextField field={field} formik={formConfig} />
            </div>
          ))}
        </div>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
          <CustomTooltip text='Name App'>
            ?
          </CustomTooltip>
          <TypographyUI>
            EnTORNO PRODUCCIÓN
          </TypographyUI>
        </Box>
        <div className='row ml-0'>
          <CheckboxWrapper label='Solicitar pase a producción' />
        </div>
      </Box>
    </Box>
  );
};

export default Connection;
