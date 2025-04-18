import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/Forms/LoginForm';
import Modal from '../../../components/Modal';
// import Icon from '../../../components/MdIcon/Icon';
import ResetPassword from '../../../components/Forms/ResetPassword';
import { fieldsLogin } from '../../../components/Forms/fields';
import { login, loginApim } from '../../../redux/actions/userAction';
import useLoginConfig from '../../../hooks/useLogin';
import classes from './login.module.scss';

function Login({ setOpenForm, setIsOpen, setPrivateSession }) {
  const { token } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(true);
  const [showResetForm, setShowResetForm] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // This function is responsible for sending the user to local storage
  const handleSubmit = (dataForm) => {
    dispatch(login(dataForm));
    dispatch(loginApim('Mulesoft'));
  };

  useEffect(() => {
    if (token.length > 0) {
      setIsOpen(false);
      navigate('/developer/profile');
    }
  }, [token]);

  const formConfig = useLoginConfig(fieldsLogin, handleSubmit);
  return (
    <Modal setOpen={setIsOpen}>
      <div className={classes.login__wrapper}>
        <h1 className={classes.login__title}>{showForm ? 'Iniciar sesión' : 'Recuperar contraseña'}</h1>
        {showForm && (
          <Form
            handleSubmit={handleSubmit}
            classes={classes}
            setShowForm={setShowForm}
            setShowResetForm={setShowResetForm}
            formik={formConfig}
            fieldsLogin={fieldsLogin}
            setOpenForm={setOpenForm}
            setIsOpen={setIsOpen}
          />
        )}
        {showResetForm && <ResetPassword handleSubmit={handleSubmit} />}
      </div>

    </Modal>
  );
};

export default Login;
