/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
// import { MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

import TextField from '../../components/common/InputMUI';
import { adminFields } from './adminField';
import useFormConfig from '../../hooks/useForm';
import classes from './style.module.scss';
// import TextAreaUI from '../../components/common/TextAreaUI';
// import InptSelectUI from '../../components/common/InputMUI/InptSelectUI';
import TypographyUI from '../../components/common/TypographyMUI';
// import Icon from '../../components/MdIcon/Icon';
import Button from '../../components/Buttons/Button';
import Title from '../../components/Title/Title';

// const cargo = [
//   {
//     value: 'ceo',
//     label: 'CEO',
//   },
//   {
//     value: 'cfo',
//     label: 'CFO',
//   },
//   {
//     value: 'cto',
//     label: 'CTO',
//   },
//   {
//     value: 'cmo',
//     label: 'CMO',
//   },
// ];

function Admin() {
  // const [cargoOrg, setCargoOrg] = useState('');
  const { user } = useSelector((state) => state.user);
  const handleSubmit = async (values) => {
    console.log(values);
  };

  // const handleChange = (event) => {
  //   setCargoOrg(event.target.value);
  // };

  const formConfig = useFormConfig(adminFields, handleSubmit);

  useEffect(() => {
    console.log(formConfig.values);
  }, [formConfig.values]);

  const name = user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? user.properties.firstName : '';
  const lastName = user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? user.properties.lastName : '';
  const email = user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? user.properties.email : '';

  const labelsUser = [
    {
      id: 'first_name',
      initialValue: name,
      placeholder: 'John',
      label: 'First name',
      validate: 'first_name',
      required: true,
      type: 'text',
    },
    {
      id: 'last_name',
      initialValue: lastName,
      placeholder: 'Doe',
      label: 'Last name',
      validate: 'last_name',
      required: true,
      type: 'text',
    },
    {
      id: 'email',
      initialValue: email,
      placeholder: 'youremail@domain.com',
      label: 'Email',
      validate: 'email',
      required: true,
      type: 'email',
    },
  ];

  return (
    <div className={classes.main__admin}>
      {user && Object.keys(user).length > 0 ? (
        <div className={classes.admin}>
          <div className='w-full my-9'>
            <Title text='Mi perfil' />
          </div>
          <form onSubmit={formConfig.handleSubmit}>
            <div className={classes.admin__form}>
              <div className={classes.admin__form__container}>
                <div className={classes.admin__form__container__header}>
                  <TypographyUI title='Datos personales' />
                  {/* <label htmlFor='contained-button-file'>
                  <div className={classes.admin__form__container__header__avatar}>
                    <Input
                      name='avatar'
                      accept='image/*'
                      type='file'
                      id='contained-button-file'
                      className={classes.admin__form__container__header__avatar__input}
                      onChange={formConfig.handleChange}
                    />
                    <Avatar
                      alt='Remy Sharp'
                      src='https://api.lorem.space/image/face?w=150&h=150'
                      sx={{ width: 74, height: 74 }}
                    />
                    <div className={classes.admin__form__container__header__avatar__icon}>
                      <Icon id='MdOutlineCameraAlt' />
                    </div>
                  </div>
                </label> */}
                </div>
                <div className='row'>
                  {labelsUser.map((field, i) => (
                    <div className='flex-lg-6 flex-sm-12'>
                      <TextField key={i} field={field} formik={formConfig} />
                    </div>
                  ))}
                  {/* <div className='w-full'>
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
                </div> */}
                </div>
              </div>
              {/* <div className={classes.admin__form__container}>
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
            </div> */}
            </div>
            <div className={classes.admin__form__container__button}>
              <div className='row'>
                <div className='flex-lg-3 flex-sm-12'>
                  <Button type='submit' styles='primary'>
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (null)}

    </div>
  );
}

export default Admin;
