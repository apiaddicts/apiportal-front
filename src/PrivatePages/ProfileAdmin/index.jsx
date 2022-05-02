import { TextField as Input } from '@mui/material';
import React from 'react';
import TextField from '../../components/common/InputMUI';
import { adminFields, adminFieldsOrg } from './adminField';
import useFormConfig from '../../hooks/useForm';
import classes from './style.module.scss';
import TextAreaUI from '../../components/common/TextAreaUI';
import CheckboxWrapper from '../../components/common/Check';

const cargo = [
  {
    value: 'ceo',
    label: 'CEO',
  },
  {
    value: 'cfo',
    label: 'CFO',
  },
  {
    value: 'cto',
    label: 'CTO',
  },
  {
    value: 'cmo',
    label: 'CMO',
  },
];

function Admin() {
  const handleSubmit = async (values) => {
    console.log(values);
  };

  const handleChangeSelect = (value, label) => {
    console.log(value, label);

  };

  const formConfig = useFormConfig(adminFields, handleSubmit);
  return (
    <div className={classes.admin}>
      <div className={classes.admin__nav}>
        Navbar
      </div>
      <div className={classes.admin__form}>
        <div className={classes.admin__form__container}>
          <p>Datos personales</p>
          <div className='row'>
            {adminFields.map((field) => (
              <div className='flex-lg-6 flex-sm-12'>
                <TextField key={field.id} field={field} formik={formConfig} />
              </div>
            ))}
            <div className='w-full'>
              <div className='flex-lg-6 flex-sm-12'>
                <Input
                  fullWidth
                  select
                  label='Cargo'
                  value={cargo}
                  variant='filled'
                >
                  {cargo.map((option) => (
                    <CheckboxWrapper handleChangeSelect={handleChangeSelect} name={option.label} label={option.label} />
                  ))}
                </Input>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.admin__form__container}>
          <p>Datos Organización</p>
          <div className='row'>
            {adminFieldsOrg.map((field) => (
              <div className={`${field.id === 'nom_comercial' ? 'flex-lg-12 flex-sm-12' : 'flex-lg-6 flex-sm-12'}`}>
                <TextField key={field.id} field={field} formik={formConfig} />
              </div>
            ))}
            <div className='flex-lg-12 flex-sm-12'>
              <TextAreaUI
                minRows={3}
                placeholder='Descripción'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
