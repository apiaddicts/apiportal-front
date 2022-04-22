import React from 'react';
import Modal from '../components/Modal';
import Icon from '../components/MdIcon/Icon';
import classes from '../styles/pages/login.module.scss';
import CreateAccount from '../components/Forms/CreateAccount';

function Register({ setOpenForm }) {

  // const encriptEmail = (email) => {
  //   const res = email.replace(/[a-z0-9\-_.]+@/ig, (c) => `${c.substr(0, 1) + c.split('').slice(1, -1).map((v) => '*').join('')}@`);
  //   return res;
  // };

  //   const handleSubmit = (dataForm) => {
  //     alert(
  //       JSON.stringify(dataForm, null, 2),
  //     );
  //   };

  return (
    <Modal>
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

    </Modal>
  );
};

export default Register;
