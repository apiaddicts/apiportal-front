import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/Forms/LoginForm';
import Modal from '../../../components/Modal';
import ForgotPassword from '../../../components/Forms/ForgotPassword';
import { fieldsLogin } from '../../../components/Forms/fields';
import useLoginConfig from '../../../hooks/useLogin';
import { useTranslation } from 'react-i18next';
import classes from './login.module.scss';
import { login } from '../../../redux/actions/authAction';

function Login({ setOpenForm, setIsOpen, setPrivateSession }) {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(true);
  const [showResetForm, setShowResetForm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (dataForm) => {
    const { username, password } = dataForm;
    dispatch(login(username, password));
  };

  useEffect(() => {
    if (token && typeof token === 'string' && token.length > 0) {
      setIsOpen(false);
      let redirect = '/developer/dashboard';
      try {
        const stashed = sessionStorage.getItem('postLoginRedirect');
        if (stashed) {
          redirect = stashed;
          sessionStorage.removeItem('postLoginRedirect');
        }
      } catch {}
      navigate(redirect);
    }
  }, [token, navigate, setIsOpen]);

  const formConfig = useLoginConfig(fieldsLogin, handleSubmit);
  return (
    <Modal setOpen={setIsOpen}>
      <div className={classes.login__wrapper}>
        <h1 className={classes.login__title}>{showForm ? t('Login.signIn') : t('Login.resetPassword')}</h1>
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
        {showResetForm && <ForgotPassword handleSubmit={handleSubmit} />}
      </div>

    </Modal>
  );
};

export default Login;
