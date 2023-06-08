import { Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import InputField from '../../../../components/Input/InputField';
import CustomSelect from '../../../../components/Input/InputUI/CustomSelect';
import Spinner from '../../../../components/Spinner';

function Information(props) {
  const {
    formField: {
      displayName,
      callback,
      description,
      expiration,
    },
  } = props;

  const { appsLoading } = useSelector((state) => state.apps);

  return (
    <Container>
      {appsLoading ? (<Spinner title='Cargando...' />) : (
        <>
          <div className='row'>
            <div className='flex-sm-12 flex-md-12'>
              <InputField type='text' name={displayName.name} label={displayName.label} fullWidth />
            </div>
          </div>
          <div className='row'>
            <div className='flex-sm-12 flex-md-12'>
              <InputField type='text' name={callback.name} label={callback.label} fullWidth />
            </div>
          </div>
          <div className='row'>
            <div className='flex-sm-12 flex-md-12'>
              <InputField type='text' name={description.name} label={description.label} fullWidth />
            </div>
          </div>
          <div className='row mt-5'>
            <div className='flex-sm-12 flex-md-12'>
              <CustomSelect name={expiration.name} label={expiration.label} placeholder='Seleccione una opción' items={expiration.items} itemText='text' itemValue='value' />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Information;
