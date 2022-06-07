import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal';
import Icon from '../components/MdIcon/Icon';
import classes from '../styles/pages/login.module.scss';
import CreateAccount from '../components/Forms/CreateAccount';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';
import Alert from '../components/Alert';

function Register({ setOpenForm, setIsOpen }) {

  const { loadingSignUp, signUpData } = useSelector((state) => state.user);
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
            }}
          >
            <Icon
              id='MdClose'
              css_styles={{
                custom_icon_styles: 'fs__20 text__gray__gray_darken',
              }}
            />
          </button>
          <div className={classes.login__wrapper}>
            <h1 className={classes.login__title}>Crea tu Cuenta</h1>
            <Alert
              css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
              alert_type='alert__danger'
              title='Error al registrarte'
            />
            <CreateAccount />
          </div>
        </>
      ) : (
        <SkeletonComponent />
      )}
    </Modal>
  );
};

export default Register;
