import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import config from './services/config';
import { I18nextProvider } from 'react-i18next';
import i18n from './services/i18n';

const siteKey = config.SiteKeyRecaptcha

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </GoogleReCaptchaProvider>,
);
