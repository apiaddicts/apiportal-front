/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Avatar, Input, MenuItem } from '@mui/material';
import TextField from '../../components/common/InputMUI';
import { adminFields, adminFieldsOrg } from './adminField';
import useFormConfig from '../../hooks/useForm';
import classes from './style.module.scss';
import TextAreaUI from '../../components/common/TextAreaUI';
import InptSelectUI from '../../components/common/InputMUI/InptSelectUI';
import TypographyUI from '../../components/common/TypographyMUI';
import Icon from '../../components/MdIcon/Icon';

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
  const [cargoOrg, setCargoOrg] = useState('');
  const handleSubmit = async (values) => {
    console.log(values);
  };

  const handleChange = (event) => {
    setCargoOrg(event.target.value);
  };

  const formConfig = useFormConfig(adminFields, handleSubmit);
  return (
    <div className={classes.admin}>
      <div className={classes.admin__nav}>
        Navbar
      </div>
      <div className={classes.admin__form}>
        <div className={classes.admin__form__container}>
          <div className={classes.admin__form__container__header}>
            <TypographyUI title='Datos personales' />
            <label htmlFor='contained-button-file'>
              <div className={classes.admin__form__container__header__avatar}>
                <Input accept='image/*' type='file' id='contained-button-file' className={classes.admin__form__container__header__avatar__input} />
                <Avatar
                  alt='Remy Sharp'
                  src='https://api.lorem.space/image/face?w=150&h=150'
                  sx={{ width: 74, height: 74 }}
                />
                <div className={classes.admin__form__container__header__avatar__icon}>
                  <Icon id='MdOutlineCameraAlt' />
                </div>
              </div>
            </label>
          </div>
          <div className='row'>
            {adminFields.map((field) => (
              <div className='flex-lg-6 flex-sm-12'>
                <TextField key={field.id} field={field} formik={formConfig} />
              </div>
            ))}
            <div className='w-full'>
              <div className='flex-lg-6 flex-sm-12'>
                <InptSelectUI
                  fullWidth
                  select
                  label='Cargo'
                  value={cargoOrg}
                  onChange={handleChange}
                >
                  {cargo.map((option, index) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </InptSelectUI>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.admin__form__container}>
          <TypographyUI title='Datos Organización' />
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
