import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal';
import Icon from '../components/MdIcon/Icon';
import classes from '../styles/pages/login.module.scss';
import CreateAccount from '../components/Forms/CreateAccount';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';

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
            <Icon id='MdClose' />
          </button>
          <div className={classes.login__wrapper}>
            <h1 className={classes.login__title}>Crear Cuenta</h1>
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
