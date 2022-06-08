import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from '../components/Forms/LoginForm';
import Modal from '../components/Modal';
import Icon from '../components/MdIcon/Icon';
//import AlertFeedbock from '../components/AlertFeedback';
import ResetPassword from '../components/Forms/ResetPassword';
import { fieldsLogin } from '../components/Forms/fields';

import { login, resetAlert } from '../redux/actions/userAction';

import classes from '../styles/pages/login.module.scss';

import useLoginConfig from '../hooks/useLogin';

function Login({ setIsOpen, setPrivateSession }) {
  const { token } = useSelector((state) => state.user);
  //const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showResetForm, setShowResetForm] = useState(false);

  const dispatch = useDispatch();

  // This function is responsible for sending the user to local storage
  const handleSubmit = (dataForm) => {
    dispatch(login(dataForm));
  };

  useEffect(() => {
    if (token.length > 0) {
      setIsOpen(false);
    }
  }, [token]);

  const formConfig = useLoginConfig(fieldsLogin, handleSubmit);
  return (
    <Modal>
      <button
        className={classes.login__close}
        type='button'
        onClick={() => {
          dispatch(resetAlert());
          setIsOpen(false);
        }}
      >
        <Icon id='MdClose' css_styles={{ 'custom_icon_styles': 'fs__20 text_gray__gray_darken' }} />
      </button>
      <div className={classes.login__wrapper}>
        <h1 className={classes.login__title}>{showForm ? 'Iniciar sesión' : 'Recuperar contraseña'}</h1>
        {/*showAlert && <AlertFeedbock setShowAlert={setShowAlert} success />*/}
        {showForm && (
          <Form
            handleSubmit={handleSubmit}
            classes={classes}
            setShowForm={setShowForm}
            setShowResetForm={setShowResetForm}
            formik={formConfig}
            fieldsLogin={fieldsLogin}
          />
        )}
        {showResetForm && <ResetPassword handleSubmit={handleSubmit} />}
      </div>

    </Modal>
  );
};

export default Login;
