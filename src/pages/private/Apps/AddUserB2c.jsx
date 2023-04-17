import { Card, Container, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputUI from '../../../components/Input/InputUI/InputUI';
import Button from '../../../components/Buttons/Button';
import Icon from '../../../components/MdIcon/Icon';
import appsActions from '../../../redux/actions/appsActions';
import Spinner from '../../../components/Spinner';
import Alert from '../../../components/Alert';

function AddUserB2c(props) {

  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  //const navigate = useNavigate();
  const { usrB2cReq, usrB2cSucc, usrB2cFail } = useSelector((state) => state.apps);
  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      forceChangePasswordNextSignIn: false,
    },
    validationSchema: Yup.object().shape({
      displayName: Yup.string().required('Campo requerido'),
      email: Yup.string().email('Formato de correo electrónico inválido').required('Campo requerido'),
      password: Yup.string().required('Campo requerido').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, 'Su contraseña debe tener al menos una letra mayúscula, una letra minuscula, un número y un caracter especial (@$!%*?&).'),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = {
        displayName: values.displayName,
        email: values.email,
        password: values.password,
        forceChangePasswordNextSignIn: values.forceChangePasswordNextSignIn,
      };
      dispatch(appsActions.registerUserb2c(data));
    },
  });
  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(usrB2cFail, 'error')) {
      if (usrB2cFail.error.status === 409) {
        setMsg(`El usuario ${formik.values.email} ya existe, intenta con un correo electrónico diferente.`);
      } else if (usrB2cFail.error.status === 400 && usrB2cFail.error.statusText.includes('The specified password does not comply with password complexity requirements. Please provide a different password.')) {
        setMsg('La contraseña especificada no cumple con los requisitos de complejidad de la contraseña. Proporcione una contraseña diferente.');
      } else {
        setMsg('Verifique que los datos introducidos en el formulario, sean correctos');
      }
    }
    formik.resetForm({
      displayName: '',
      email: '',
      password: '',
      forceChangePasswordNextSignIn: false,
    });
  }, [usrB2cFail]);
  useEffect(() => {
    formik.resetForm({
      displayName: '',
      email: '',
      password: '',
      forceChangePasswordNextSignIn: false,
    });
  }, [usrB2cSucc]);

  return (
    <Container fixed className='container__padding'>
      <div className='back__btn'>
        <Link to={-1}>
          <div className='return'>
            <div>
              <Icon id='MdKeyboardBackspace' />
            </div>
            <span>VOLVER</span>
          </div>
        </Link>
      </div>
      <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
        {usrB2cSucc && Object.keys(usrB2cSucc).length > 0 ? (
          <Alert
            key={Math.floor(Math.random() * 100) + 1}
            css_styles={{ custom_padding: 'p-4', custom_margin: 'mb-5' }}
            alert_type='alert__success'
            title='Registro de usuario B2c'
            msg='El usuario se ha registrado correctamente'
            display={true}
          />
        ) : null}
        {usrB2cFail && Object.keys(usrB2cFail).length > 0 ? (
          <Alert
            key={Math.floor(Math.random() * 100) + 1}
            css_styles={{ custom_padding: 'p-4', custom_margin: 'mb-5' }}
            alert_type='alert__danger'
            title='Registro de usuario B2c'
            msg={msg || 'Sucedio un error al registrar usuario al B2C, intente más tarde'}
            display={true}
          />
        ) : null}
        {usrB2cReq ? (<Spinner title='Cargando...' />) : (
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <div className='row justify-center'>
                <div className='flex-sm-12 flex-md-6 flex-lg-6 py-4'>
                  <InputUI
                    name='displayName'
                    id='displayName'
                    type='text'
                    label='Nombre completo'
                    touched={formik.touched.displayName}
                    errors={formik.errors.displayName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    values={formik.values.displayName}
                  />
                </div>
              </div>
              <div className='row justify-center'>
                <div className='flex-sm-12 flex-md-6 flex-lg-6 py-4'>
                  <InputUI
                    name='email'
                    id='email'
                    type='email'
                    label='Correo electrónico'
                    touched={formik.touched.email}
                    errors={formik.errors.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    values={formik.values.email}
                  />
                </div>
              </div>
              <div className='row justify-center'>
                <div className='flex-sm-12 flex-md-6 flex-lg-6 py-4'>
                  <InputUI
                    name='password'
                    id='password'
                    type='password'
                    label='Contraseña'
                    touched={formik.touched.password}
                    errors={formik.errors.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    values={formik.values.password}
                  />
                </div>
              </div>

              <div className='row justify-center'>
                <div className='flex-sm-12 flex-md-6 flex-lg-6 py-4'>
                  <Button styles='primary-blue' type='submit'>
                    Registrarse
                  </Button>
                </div>
              </div>
            </form>
          </Grid>
        )}
      </Card>
    </Container>
  );
}

AddUserB2c.propTypes = {};

export default AddUserB2c;
