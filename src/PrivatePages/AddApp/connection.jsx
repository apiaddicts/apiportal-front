import React, { useState } from 'react';
import { Alert, Box, Stack } from '@mui/material';
import CustomTooltip from '../../components/common/ToolTip';
import { TypographyUI } from '../../components/common/TypographyMUI/style';
import TextField from '../../components/common/InputMUI';
import { fieldsAppSandbox, fieldsAppPre } from './field';
import useNewApp from '../../hooks/useNewApp';
import CheckboxWrapper from '../../components/common/Check';

function Connection() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (dataForm) => {};

  const handleChangeSelect = (name, label, value) => {
    setShowAlert(value);
  };

  const formConfig = useNewApp(fieldsAppSandbox, handleSubmit);
  const formConfigPre = useNewApp(fieldsAppPre, handleSubmit);
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
          <CustomTooltip text='ETORNO SANDBOX'>
            ?
          </CustomTooltip>
          <TypographyUI>
            ENTORNO SANDBOX
          </TypographyUI>
        </Box>
        <div className='row'>
          {fieldsAppSandbox.map((field) => (
            <div key={field.id} className='flex-lg-4 flex-sm-12'>
              <TextField field={field} formik={formConfig} iconCopy iconEye />
            </div>
          ))}
        </div>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
          <CustomTooltip text='ENTORNO PRE'>
            ?
          </CustomTooltip>
          <TypographyUI>
            ENTORNO PRE
          </TypographyUI>
        </Box>
        <div className='row'>
          {fieldsAppPre.map((field) => (
            <div key={field.id} className='flex-lg-4 flex-sm-12'>
              <TextField field={field} formik={formConfigPre} iconCopy iconEye />
            </div>
          ))}
        </div>
      </Box>
      <Box sx={{ mt: 5, pb: showAlert ? 0 : 4 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
          <CustomTooltip text='ENTORNO PRODUCCIÓN'>
            ?
          </CustomTooltip>
          <TypographyUI>
            ENTORNO PRODUCCIÓN
          </TypographyUI>
        </Box>
        <div className='row ml-0'>
          <CheckboxWrapper name='Solicitar a Pre' label='Solicitar pase a producción' handleChangeSelect={handleChangeSelect} />
        </div>
      </Box>
      {showAlert && (
        <Stack sx={{ width: '100%', mt: 2, pb: 4 }} spacing={2}>
          <Alert severity='success'>Se ha solicitado el pase a producción de la app, te avisaremos cuando esté aprobada.</Alert>
        </Stack>
      )}
    </Box>
  );
};

export default Connection;
