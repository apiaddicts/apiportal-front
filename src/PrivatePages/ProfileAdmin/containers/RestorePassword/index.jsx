import React from 'react';
import useFormRestorePassword from '../../../../hooks/useFormRestorePassword';
import Button from '../../../../components/Buttons/Button';
import TextField from '../../../../components/common/InputMUI';
import { restorePasswordField } from '../../adminField';

function RestorePassword({ display }) {

  const handleSubmit = async (values) => {
    console.log('Enviar formulario');
  };
  const formConfig = useFormRestorePassword(restorePasswordField, handleSubmit);
  const displayClass = display ? 'd-block' : 'd-none';
  return (
    <div className={displayClass}>
      <div className='row'>
        {restorePasswordField.map((field, i) => (
          <div className='flex-lg-6 flex-sm-12'>
            <TextField key={i} field={field} formik={formConfig} />
          </div>
        ))}

        <div className='flex-lg-3 flex-sm-12 display_flex align_items__bottom justify_content__end ml-auto mb-2'>
          <Button type='submit' styles='primary'>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RestorePassword;
