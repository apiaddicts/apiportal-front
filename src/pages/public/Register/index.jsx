import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetAlert } from '../../../redux/actions/userAction';
import Modal from '../../../components/Modal';
import Icon from '../../../components/MdIcon/Icon';
import CreateAccount from '../../../components/Forms/CreateAccount';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import Alert from '../../../components/Alert';
import classes from './register.module.scss';

function Register({ setOpenForm, setIsOpen }) {
  const { loadingSignUp, signUpData, responseError } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (signUpData && Object.keys(signUpData).length > 0) {
      setIsOpen(true);
      setOpenForm(false);
    }
  }, [signUpData]);

  return (
    <Modal>
      {loadingSignUp === false ? (
        <>
          <button
            className={classes.login__close}
            type='button'
            onClick={() => {
              setOpenForm(false);
              dispatch(resetAlert());
            }}
          >
            <Icon
              id='MdClose'
              css_styles={{
                custom_icon_styles: 'fs__26 text__gray__gray_darken',
              }}
            />
          </button>
          <div className={classes.login__wrapper}>
            <h1 className={classes.login__title}>Crea tu Cuenta</h1>
            {
              Object.keys(signUpData).length > 0 ?
                (
                  <Alert
                    css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                    alert_type='alert__success'
                    title='Revisa tu cuenta de correo'
                    msg='Para completar el registro, es necesario confirmar tu cuenta de correo'
                  />
                ) : Object.keys(responseError).length > 0 ? (
                  <Alert
                    css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                    alert_type='alert__danger'
                    title='Error al registrarte'
                    msg='El usuario ya esta dado de alta'
                  />
                ) : (null)
            }
            <CreateAccount setOpenForm={setOpenForm} setIsOpen={setIsOpen} />
          </div>
        </>
      ) : (
        <SkeletonComponent />
      )}
    </Modal>
  );
};

export default Register;
