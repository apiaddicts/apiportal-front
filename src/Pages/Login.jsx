import React, { useState } from 'react';
import Form from '../components/Forms/LoginForm';
import Modal from '../components/Modal';
import Icon from '../components/MdIcon/Icon';
import classes from '../styles/pages/login.module.scss';
import AlertFeedbock from '../components/AlertFeedback';
import ResetPassword from '../components/Forms/ResetPassword';
import { fieldsLogin } from '../components/Forms/fields';
import useLoginConfig from '../hooks/useLogin';

function Login({ setIsOpen, setPrivateSession }) {
  const [showAlert, setShowAlert] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [showResetForm, setShowResetForm] = useState(false);

  // const encriptEmail = (email) => {
  //   const res = email.replace(/[a-z0-9\-_.]+@/ig, (c) => `${c.substr(0, 1) + c.split('').slice(1, -1).map((v) => '*').join('')}@`);
  //   return res;
  // };

  const handleSubmit = (dataForm) => {
    setPrivateSession(true);
    localStorage.setItem('session', true);
    setIsOpen(false);
    alert(
      JSON.stringify(dataForm, null, 2),
    );
  };

  const formConfig = useLoginConfig(fieldsLogin, handleSubmit);
  return (
    <Modal>
      <button
        className={classes.login__close}
        type='button'
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <Icon id='MdClose' />
      </button>
      <div className={classes.login__wrapper}>
        <h1 className={classes.login__title}>{showForm ? 'Iniciar sesión' : 'Recuperar contraseña'}</h1>
        {showAlert && <AlertFeedbock setShowAlert={setShowAlert} success />}
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
