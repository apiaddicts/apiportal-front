import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { resetAlert } from '../../../redux/actions/userAction';
import Modal from '../../../components/Modal';
// import Icon from '../../../components/MdIcon/Icon';
import CreateAccount from '../../../components/Forms/CreateAccount';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import Alert from '../../../components/Alert';
import classes from './register.module.scss';
import { useTranslation } from 'react-i18next';

function Register({ setOpenForm, setIsOpen }) {
  const { t } = useTranslation();
  const { loadingSignUp, signUpData, responseError } = useSelector((state) => state.user);

  useEffect(() => {
    if (signUpData && Object.keys(signUpData).length > 0) {
      setIsOpen(true);
      setOpenForm(false);
    }
  }, [signUpData]);
  return (
    <Modal setOpen={setOpenForm} maxWidth='md'>
      {loadingSignUp === false ? (
        <div>
          <h1 className={classes.login__title}>{t('Register.createAccount')}</h1>
          <div className='container'>
            <div className='row'>
              <div className='flex-sm-12 flex-md-12 flex-lg-12'>
                {
                  Object.keys(signUpData).length > 0 && Object.keys(responseError).length === 0 ?
                    (
                      <Alert
                        css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                        alert_type='alert__success'
                        title={t('Register.checkEmail')}
                        msg={t('Register.confirmEmail')}
                      />
                    ) : Object.keys(signUpData).length === 0 && Object.keys(responseError).length > 0 ? (
                      <Alert
                        css_styles={{ custom_padding: 'p-4', custom_margin: '' }}
                        alert_type='alert__danger'
                        title={t('Register.errorRegister')}
                        msg={t('Register.userExists')}
                      />
                    ) : (null)
                }
              </div>
            </div>
          </div>
          <CreateAccount setOpenForm={setOpenForm} setIsOpen={setIsOpen} />
        </div>
      ) : (
        <SkeletonComponent />
      )}
    </Modal>
  );
};

export default Register;
