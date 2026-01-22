import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import InputUI from '../../Input/InputUI/InputUI';
import useFormConfig from '../../../hooks/useForm';
import Button from '../../Buttons/Button';
import { fieldsRegister } from '../fields';
import { signUp, registerDataToStore } from '../../../redux/actions/userAction';
import CustomMarkdown from '../../CustomMarkdown';
import CloseIcon from '@mui/icons-material/Close';

import './index.scss';
import { getTermsContent } from '../../../redux/actions/termAction';
import { IconButton } from '@mui/material';

function CreateAccount({ setOpenForm, setIsOpen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [termsData, setTermsData] = useState({ title: '', content: '' });

  const { termPage } = useSelector((state) => state.term);

  useEffect(() => {
    if (!termPage || Object.keys(termPage).length === 0) {
      dispatch(getTermsContent());
    }
  }, [dispatch, termPage]);

  useEffect(() => {
    if (termPage && Object.keys(termPage).length > 0) {
      const section = termPage.contentSections?.[0];
      setTermsData({
        title: section?.title || t('CreateAccount.termsTitle'),
        content: section?.content || t('CreateAccount.checkboxTermsLabel'),
      });
    }
  }, [termPage, t]);

  const handleSubmit = async (values) => {
    if (!executeRecaptcha) {
      console.warn("Recaptcha not yet available");
      return;
    }

    const recaptchaToken = await executeRecaptcha('signup');

    const data = {
      username: values.username,
      email: values.email,
      firstName: values.first_name,
      lastName: values.last_name,
      companyName: values.company,
      appType: 'developerPortal',
      confirmation: 'signup',
      password: values.password,
      state: 'pending',
      recaptchaToken,
    };

    dispatch(registerDataToStore(data.email));
    dispatch(signUp(data, 'Mulesoft'));
  };

  const handleClose = () => {
    setIsTermsOpen(false);
  };

  const formConfig = useFormConfig(fieldsRegister, handleSubmit);

  return (
    <div className='wrapper__register'>
      <form onSubmit={formConfig.handleSubmit} noValidate>
        <div className='row'>
          {fieldsRegister.filter((item) => item.type !== 'checkbox').map((field, index) => (
            <div key={index} className='flex-sm-12 flex-md-6 flex-lg-6 py-4'>
              <InputUI
                id={field.id}
                name={field.name}
                type={field.type}
                label={t(`CreateAccount.${field.id}`)}
                touched={formConfig.touched[field.id]}
                errors={formConfig.errors[field.id]}
                onChange={formConfig.handleChange}
                onBlur={formConfig.handleBlur}
                value={formConfig.values[field.name]}
              />
            </div>
          ))}
        </div>

        <div className='row'>
          <div className='flex-sm-12 flex-md-12'>
            <div className='create-account__checkbox input__checkbox'>
              {fieldsRegister.filter((field) => field.type === 'checkbox').map((field, index) => (
                <input
                  key={index}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  value={field.value}
                  checked={formConfig.values[field.name]} 
                  onChange={formConfig.handleChange}
                />
              ))}

              <p className={formConfig.errors.terms ? 'text__error' : ''}>
                <span
                  className="terms__link"
                  style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff' }}
                  onClick={() => setIsTermsOpen(true)}
                >
                  <CustomMarkdown content={t('CreateAccount.checkboxTermsLabel')} />
                </span>

                {formConfig.errors.terms && formConfig.touched.terms && (
                  <p className='text__error'>{t('CreateAccount.acceptTermsError')}</p>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className='row my-4 register__btn'>
          <div className='flex-sm-12 flex-md-5'>
            <Button
              styles='secundary-white'
              type='button'
              onClick={() => {
                setOpenForm(false);
                setIsOpen(true);
              }}
            >
              {t('CreateAccount.loginButton')}
            </Button>
          </div>
          <div className='flex-sm-12 flex-md-5'>
            <Button
              styles={formConfig.errors.terms && formConfig.touched.terms ? 'greey-primary' : 'tertiary'}
              type='submit'
              disabled={formConfig.errors.terms && formConfig.touched.terms}
            >
              {t('CreateAccount.registerButton')}
            </Button>
          </div>
        </div>
      </form>

      {isTermsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '#14234B',
                fontSize: '20px',
              }}
            >
              <CloseIcon />
            </IconButton>
            <h2 className="modal-title">{termsData.title}</h2>
            <CustomMarkdown content={termsData.content} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
