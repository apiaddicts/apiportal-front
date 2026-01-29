import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/Buttons/Button';
import LanguageSelector from '../../../components/LanguageSelector/LanguageSelector';

import classes from './email-confirmed.module.scss';

function EmailConfirmed() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.navbar}>
        <div className={classes.navbar__content} />
        <LanguageSelector />
      </div>

      <div className={classes.wrapper}>
        <div className={classes.wrapper__content}>

          <div className={classes.wrapper__content__text}>
            <h1>{t('EmailConfirmed.successTitle')}</h1>

            <div className={classes.text}>
              {t('EmailConfirmed.successMessage')}
            </div>
          </div>

          <Button
            styles="primary-dinamic"
            onClick={() => navigate('/')}
          >
            {t('EmailConfirmed.goHome')}
          </Button>

        </div>
      </div>
    </div>
  );
}

export default EmailConfirmed;